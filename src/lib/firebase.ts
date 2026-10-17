import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import { type Analytics, getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Safe fallback for build-time static prerendering when env vars might be undefined
const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app: FirebaseApp =
	getApps().length > 0
		? getApp()
		: initializeApp(
				isConfigured
					? (firebaseConfig as Record<string, string>)
					: {
							apiKey: "dummy-api-key-for-build",
							projectId: "dummy-project-id",
							authDomain: "dummy.firebaseapp.com",
						},
			);

const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
	isSupported().then((supported) => {
		if (supported && firebaseConfig.measurementId) {
			analytics = getAnalytics(app);
		}
	});
}

export { app, auth, googleProvider, analytics };
