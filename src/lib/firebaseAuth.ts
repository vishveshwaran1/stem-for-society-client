import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Convert Firebase User to our AuthUser interface
const convertFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
});

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthUser> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    return convertFirebaseUser(result.user);
  } catch (error: any) {
    console.error("Google sign-in error:", error);
    throw new Error(error.message || "Failed to sign in with Google");
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return convertFirebaseUser(result.user);
  } catch (error: any) {
    console.error("Email sign-in error:", error);
    throw new Error(error.message || "Failed to sign in with email");
  }
};

// Create account with email and password
export const createAccountWithEmail = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return convertFirebaseUser(result.user);
  } catch (error: any) {
    console.error("Account creation error:", error);
    throw new Error(error.message || "Failed to create account");
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Sign out error:", error);
    throw new Error(error.message || "Failed to sign out");
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(convertFirebaseUser(user));
    } else {
      callback(null);
    }
  });
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  const user = auth.currentUser;
  return user ? convertFirebaseUser(user) : null;
};

// Sign up with Google (same as sign in for OAuth)
export const signUpWithGoogle = signInWithGoogle;
