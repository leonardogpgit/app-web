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
	getSyncedToken,
	getSyncedUser,
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
				const token = await currentUser.getIdToken().catch(() => null);
				notifyGlobalLogin(currentUser, token);
				setUser(currentUser);
			} else {
				// Fallback: check if there is an active synced session on .animusproject.org
				const synced = getSyncedUser();
				if (synced && !isGloballyLoggedOut(synced.uid)) {
					const compatibleUser = {
						uid: synced.uid,
						email: synced.email,
						displayName: synced.displayName,
						photoURL: synced.photoURL,
						getIdToken: async () => getSyncedToken(),
						getIdTokenResult: async () => ({ token: getSyncedToken() || "" }),
					} as unknown as User;
					setUser(compatibleUser);
				} else {
					setUser(null);
				}
			}
			setLoading(false);
		});

		// Listen for cross-tab / cross-subdomain logout or login triggers
		const checkSync = async () => {
			if (user && isGloballyLoggedOut(user.uid)) {
				try {
					await firebaseSignOut(auth);
				} catch (e) {
					console.error("Sign-out error during tab sync:", e);
				}
				setUser(null);
				return;
			}

			// If local user is null, check if a global session was initiated
			if (!user) {
				const synced = getSyncedUser();
				if (synced && !isGloballyLoggedOut(synced.uid)) {
					const compatibleUser = {
						uid: synced.uid,
						email: synced.email,
						displayName: synced.displayName,
						photoURL: synced.photoURL,
						getIdToken: async () => getSyncedToken(),
						getIdTokenResult: async () => ({ token: getSyncedToken() || "" }),
					} as unknown as User;
					setUser(compatibleUser);
				}
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
	}, [user?.uid]);

	const signInWithGoogle = async () => {
		try {
			const cred = await signInWithPopup(auth, googleProvider);
			if (cred?.user) {
				const token = await cred.user.getIdToken().catch(() => null);
				notifyGlobalLogin(cred.user, token);
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
				const token = await cred.user.getIdToken().catch(() => null);
				notifyGlobalLogin(cred.user, token);
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
				const token = await cred.user.getIdToken().catch(() => null);
				notifyGlobalLogin(cred.user, token);
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
		if (auth.currentUser) {
			try {
				return await auth.currentUser.getIdToken();
			} catch {
				// fallback
			}
		}
		return getSyncedToken();
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
