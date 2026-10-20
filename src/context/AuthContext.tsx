"use client";

import {
	type User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
} from "firebase/auth";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
	isGloballyLoggedOut,
	notifyGlobalLogin,
	notifyGlobalLogout,
} from "@/lib/sessionSync";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	signInWithGoogle: () => Promise<void>;
	signInWithEmail: (email: string, pass: string) => Promise<void>;
	signUpWithEmail: (email: string, pass: string) => Promise<void>;
	logout: () => Promise<void>;
	getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	signInWithGoogle: async () => {},
	signInWithEmail: async () => {},
	signUpWithEmail: async () => {},
	logout: async () => {},
	getIdToken: async () => null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				if (isGloballyLoggedOut(currentUser.uid)) {
					try {
						await firebaseSignOut(auth);
					} catch (e) {
						console.error("Sign-out error during global sync:", e);
					}
					setUser(null);
					setLoading(false);
					return;
				}
				notifyGlobalLogin(currentUser.uid);
				setUser(currentUser);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		// Listen for cross-tab / cross-subdomain logout triggers
		const checkSync = async () => {
			if (auth.currentUser && isGloballyLoggedOut(auth.currentUser.uid)) {
				try {
					await firebaseSignOut(auth);
				} catch (e) {
					console.error("Sign-out error during tab sync:", e);
				}
				setUser(null);
			}
		};

		window.addEventListener("focus", checkSync);
		document.addEventListener("visibilitychange", checkSync);
		const interval = setInterval(checkSync, 2000);

		return () => {
			unsubscribe();
			window.removeEventListener("focus", checkSync);
			document.removeEventListener("visibilitychange", checkSync);
			clearInterval(interval);
		};
	}, []);

	const signInWithGoogle = async () => {
		try {
			const cred = await signInWithPopup(auth, googleProvider);
			if (cred?.user) {
				notifyGlobalLogin(cred.user.uid);
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Google sign-in error:", error);
			throw error;
		}
	};

	const signInWithEmail = async (email: string, pass: string) => {
		try {
			const cred = await signInWithEmailAndPassword(auth, email, pass);
			if (cred?.user) {
				notifyGlobalLogin(cred.user.uid);
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Email sign-in error:", error);
			throw error;
		}
	};

	const signUpWithEmail = async (email: string, pass: string) => {
		try {
			const cred = await createUserWithEmailAndPassword(auth, email, pass);
			if (cred?.user) {
				notifyGlobalLogin(cred.user.uid);
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Email sign-up error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			notifyGlobalLogout();
			await firebaseSignOut(auth);
			setUser(null);
		} catch (error) {
			console.error("Sign-out error:", error);
			notifyGlobalLogout();
			setUser(null);
			throw error;
		}
	};

	const getIdToken = async () => {
		if (!auth.currentUser) return null;
		return await auth.currentUser.getIdToken();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signInWithGoogle,
				signInWithEmail,
				signUpWithEmail,
				logout,
				getIdToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
