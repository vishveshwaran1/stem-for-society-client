import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { 
  signInWithGoogle as firebaseSignInWithGoogle, 
  signOutUser as firebaseSignOut, 
  onAuthStateChange,
  AuthUser 
} from "./firebaseAuth";
import { useUser } from "./hooks";
import { UserAuthResponse } from "./types";
import { api } from "./api";
import { API_URL } from "../Constants";

type UseHybridAuthArgs = {
  extraOnSuccess?: () => void;
};

export function useHybridAuth({ extraOnSuccess = () => null }: UseHybridAuthArgs = {}) {
  const [firebaseUser, setFirebaseUser] = useState<AuthUser | null>(null);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Use existing email auth system
  const { user: emailUser, signIn: emailSignIn, signOut: emailSignOut, isSigningIn, isLoading: emailLoading } = useUser({ extraOnSuccess });

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setFirebaseUser(user);
      setIsFirebaseLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Always prioritize emailUser (backend authenticated user) over firebaseUser
  const user = emailUser;

  const isLoading = emailLoading || isFirebaseLoading;

  // Sign in with Google and use exact same backend flow as email auth
  const signInGoogle = async () => {
    try {
      const firebaseUserData = await firebaseSignInWithGoogle();
      setFirebaseUser(firebaseUserData);
      
      // Use the EXACT same backend endpoint as normal email login: /auth/sign-in
      // But send Google user data in the same format
      try {
        const response = await api().post(`${API_URL}/auth/sign-in`, {
          email: firebaseUserData.email,
          password: `google_${firebaseUserData.uid}`, // Use Google UID as password identifier
          isGoogleAuth: true,
          googleData: {
            name: firebaseUserData.displayName,
            googleId: firebaseUserData.uid,
            photoURL: firebaseUserData.photoURL
          }
        });
        
        // Use EXACT same success handling as email auth
        queryClient.setQueryData(["auth"], response.data.data);
        toast.success("Login was successful!");
        extraOnSuccess();
      } catch (backendError: any) {
        // If user doesn't exist, register them first using same register endpoint
        try {
          await api().post(`${API_URL}/auth/register`, {
            email: firebaseUserData.email,
            firstName: firebaseUserData.displayName?.split(' ')[0] || 'User',
            lastName: firebaseUserData.displayName?.split(' ').slice(1).join(' ') || '',
            password: `google_${firebaseUserData.uid}`,
            mobile: '', // Optional for Google users
            isGoogleAuth: true,
            googleId: firebaseUserData.uid
          });
          
          // Now sign in with same endpoint
          const response = await api().post(`${API_URL}/auth/sign-in`, {
            email: firebaseUserData.email,
            password: `google_${firebaseUserData.uid}`,
            isGoogleAuth: true,
            googleData: {
              name: firebaseUserData.displayName,
              googleId: firebaseUserData.uid,
              photoURL: firebaseUserData.photoURL
            }
          });
          
          queryClient.setQueryData(["auth"], response.data.data);
          toast.success("Login was successful!");
          extraOnSuccess();
        } catch (registerError: any) {
          console.error("Google auth failed:", registerError);
          toast.error("Authentication failed. Please try again.");
          queryClient.setQueryData(["auth"], null);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  // Combined sign out
  const signOut = async () => {
    try {
      // Sign out from both systems
      if (firebaseUser) {
        await firebaseSignOut();
        setFirebaseUser(null);
      }
      if (emailUser) {
        emailSignOut();
      }
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return {
    user,
    isLoading,
    isError: false,
    isSigningIn,
    signIn: emailSignIn, // Keep email sign-in for backend integration
    signInGoogle,
    signOut,
    firebaseUser,
    emailUser
  };
}
