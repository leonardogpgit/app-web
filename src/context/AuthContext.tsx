"use client";

import {
	type User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	onIdTokenChanged,
	signInWithCustomToken,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
} from "firebase/auth";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
	clearSharedSession,
	getSharedSession,
	isLoggedOut,
	setSharedSession,
	type SharedSessionData,
} from "@/lib/cookieAuth";

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

function createSyntheticUser(session: SharedSessionData): any {
	return {
		uid: session.uid,
		email: session.email,
		displayName: session.displayName,
		photoURL: session.photoURL,
		getIdToken: async () => session.token,
		metadata: {
			creationTime: new Date(session.updatedAt).toUTCString(),
			lastSignInTime: new Date(session.updatedAt).toUTCString(),
		},
	};
}

let isPromotingToken = false;
async function promoteCustomToken(idToken: string) {
	if (isPromotingToken || typeof window === "undefined") return;
	isPromotingToken = true;
	try {
		const backendUrl =
			process.env.NEXT_PUBLIC_ANIMUS_BACKEND_URL ||
			"https://jarvisback.animusproject.org";
		const res = await fetch(`${backendUrl}/session/custom-token`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${idToken}`,
				"Content-Type": "application/json",
				"x-imago-language": "en",
			},
		});

		if (res.ok) {
			const json = await res.json();
			const customToken = json?.data?.customToken || json?.customToken;
			if (customToken) {
				await signInWithCustomToken(auth, customToken);
			}
		}
	} catch {
		// Silent catch; synthetic user session remains active
	} finally {
		isPromotingToken = false;
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// If globally logged out, ensure clean state
		if (isLoggedOut()) {
			clearSharedSession();
			setUser(null);
			setLoading(false);
			firebaseSignOut(auth).catch(() => {});
			return;
		}

		// Eagerly hydrate from shared session
		const initialSession = getSharedSession();
		if (initialSession) {
			setUser(createSyntheticUser(initialSession));
			setLoading(false);
		}

		const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
			if (isLoggedOut()) {
				if (currentUser) {
					await firebaseSignOut(auth).catch(() => {});
				}
				setUser(null);
				setLoading(false);
				return;
			}

			if (currentUser) {
				setUser(currentUser);
				setLoading(false);
				try {
					const token = await currentUser.getIdToken();
					setSharedSession({
						uid: currentUser.uid,
						email: currentUser.email,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
						token,
						updatedAt: Date.now(),
					});
				} catch (err) {
					console.error("Failed to sync ID token to shared session:", err);
				}
			} else {
				const session = getSharedSession();
				if (session) {
					setUser((prev) =>
						prev && prev.uid === session.uid
							? prev
							: createSyntheticUser(session),
					);
					setLoading(false);
					promoteCustomToken(session.token);
				} else {
					setUser(null);
					setLoading(false);
				}
			}
		});

		const unsubToken = onIdTokenChanged(auth, async (currentUser) => {
			if (currentUser && !isLoggedOut()) {
				try {
					const token = await currentUser.getIdToken();
					setSharedSession({
						uid: currentUser.uid,
						email: currentUser.email,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
						token,
						updatedAt: Date.now(),
					});
				} catch {}
			}
		});

		return () => {
			unsubAuth();
			unsubToken();
		};
	}, []);

	// Active cross-tab / cross-subdomain session synchronization
	useEffect(() => {
		const syncState = () => {
			if (isLoggedOut()) {
				if (user !== null) {
					setUser(null);
					firebaseSignOut(auth).catch(() => {});
				}
				return;
			}

			const session = getSharedSession();
			if (!session) {
				if (user !== null && !auth.currentUser) {
					setUser(null);
				}
			} else {
				if (!user || user.uid !== session.uid) {
					setUser(createSyntheticUser(session));
					setLoading(false);
				}
			}
		};

		const interval = setInterval(syncState, 1500);
		const handleFocus = () => syncState();
		const handleVisibility = () => {
			if (typeof document !== "undefined" && document.visibilityState === "visible") {
				syncState();
			}
		};

		window.addEventListener("focus", handleFocus);
		document.addEventListener("visibilitychange", handleVisibility);

		return () => {
			clearInterval(interval);
			window.removeEventListener("focus", handleFocus);
			document.removeEventListener("visibilitychange", handleVisibility);
		};
	}, [user]);

	const signInWithGoogle = async () => {
		try {
			const cred = await signInWithPopup(auth, googleProvider);
			if (cred?.user) {
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
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
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
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
				const token = await cred.user.getIdToken();
				setSharedSession({
					uid: cred.user.uid,
					email: cred.user.email,
					displayName: cred.user.displayName,
					photoURL: cred.user.photoURL,
					token,
					updatedAt: Date.now(),
				});
				setUser(cred.user);
			}
		} catch (error) {
			console.error("Email sign-up error:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			clearSharedSession();
			await firebaseSignOut(auth);
			setUser(null);
			if (typeof window !== "undefined") {
				window.location.href = "https://animusproject.org/login";
			}
		} catch (error) {
			console.error("Sign-out error:", error);
			clearSharedSession();
			setUser(null);
			if (typeof window !== "undefined") {
				window.location.href = "https://animusproject.org/login";
			}
			throw error;
		}
	};

	const getIdToken = useCallback(async () => {
		if (auth.currentUser) {
			const token = await auth.currentUser.getIdToken();
			const session = getSharedSession();
			if (session) {
				setSharedSession({ ...session, token, updatedAt: Date.now() });
			}
			return token;
		}
		const session = getSharedSession();
		return session ? session.token : null;
	}, []);

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
