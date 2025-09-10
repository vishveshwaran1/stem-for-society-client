import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  signInWithEmail, 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange,
  AuthUser 
} from "./firebaseAuth";

type UseFirebaseAuthArgs = {
  extraOnSuccess?: () => void;
};

export function useFirebaseAuth({ extraOnSuccess = () => null }: UseFirebaseAuthArgs = {}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
      if (user) {
        extraOnSuccess();
      }
    });

    return () => unsubscribe();
  }, [extraOnSuccess]);

  // Sign in with email and password
  const signIn = async (credentials: { email: string; password: string }) => {
    setIsSigningIn(true);
    try {
      const user = await signInWithEmail(credentials.email, credentials.password);
      setUser(user);
      toast.success("Login was successful!");
      extraOnSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsSigningIn(false);
    }
  };

  // Sign in with Google
  const signInGoogle = async () => {
    setIsSigningIn(true);
    try {
      const user = await signInWithGoogle();
      setUser(user);
      toast.success(`Welcome ${user.displayName || user.email}!`);
      extraOnSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsSigningIn(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return {
    user,
    isLoading,
    isError: false, // Firebase handles errors differently
    isSigningIn,
    signIn,
    signInGoogle,
    signOut,
  };
}
