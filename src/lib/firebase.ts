import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey:
		process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
		"AIzaSyDvWD9qfsH_JiaTrTT_6Up9AWTfgnNgGyM",
	authDomain:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
		"animus-b9e28.firebaseapp.com",
	projectId:
		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "animus-b9e28",
	storageBucket:
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
		"animus-b9e28.firebasestorage.app",
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "78511902123",
	appId:
		process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
		"1:78511902123:android:32f9e6373c5402a734d6ee",
};

const app: FirebaseApp =
	getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
