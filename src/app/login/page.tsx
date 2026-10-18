"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
	const router = useRouter();
	const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, logout } =
		useAuth();

	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (user) {
		return (
			<section className="py-20 md:py-28 flex items-center justify-center px-4">
				<div className="card-base w-full max-w-md p-8 text-center space-y-6">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 text-xl font-bold font-michroma">
						{user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
					</div>
					<div>
						<h1 className="text-2xl font-bold font-michroma text-black dark:text-white">
							Session Active
						</h1>
						<p className="mt-2 text-sm text-black/70 dark:text-white/70">
							{user.email || user.displayName || user.uid}
						</p>
						<p className="mt-1 font-mono text-xs text-black/40 dark:text-white/40 break-all">
							UID: {user.uid}
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<button
							type="button"
							onClick={() => router.push("/app/graph")}
							className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity"
						>
							Open Graph
						</button>
						<button
							type="button"
							onClick={() => logout()}
							className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
						>
							Sign Out
						</button>
					</div>
				</div>
			</section>
		);
	}

	const handleGoogleSignIn = async () => {
		try {
			setError(null);
			setIsSubmitting(true);
			await signInWithGoogle();
			router.push("/app/graph");
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to sign in with Google";
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEmailAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please fill in both email and password.");
			return;
		}

		try {
			setError(null);
			setIsSubmitting(true);
			if (isSignUp) {
				await signUpWithEmail(email, password);
			} else {
				await signInWithEmail(email, password);
			}
			router.push("/app/graph");
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Authentication failed";
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-20 md:py-28 flex items-center justify-center px-4">
			<div className="card-base w-full max-w-md p-8 space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-2xl sm:text-3xl font-bold font-michroma text-black dark:text-white">
						{isSignUp ? "Join Animus Project" : "Access Animus Project"}
					</h1>
					<p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
						Unified authentication across the Animus Project ecosystem.
					</p>
				</div>

				{error && (
					<div className="rounded-xl border border-slate-300 dark:border-white/10 bg-slate-200/50 dark:bg-white/5 p-3.5 text-xs text-black dark:text-white leading-relaxed">
						{error}
					</div>
				)}

				<button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={isSubmitting}
					className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 dark:border-white/10 bg-[#f4f7fb] dark:bg-white/5 px-4 py-3 text-sm font-medium font-michroma text-black dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
				>
					<FcGoogle className="h-5 w-5 shrink-0" />
					<span>Continue with Google</span>
				</button>

				<div className="relative flex items-center justify-center">
					<div className="w-full border-t border-slate-300 dark:border-white/10" />
					<span className="absolute bg-[#f4f7fb] dark:bg-[#0f0f13] px-3 text-[11px] font-mono uppercase text-black/50 dark:text-white/50">
						or email
					</span>
				</div>

				<form onSubmit={handleEmailAuth} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-xs font-medium font-michroma text-black dark:text-white"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@domain.com"
							required
							className="w-full rounded-xl border border-slate-300 bg-[#f4f7fb] px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-500 focus:border-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-white"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-xs font-medium font-michroma text-black dark:text-white"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="w-full rounded-xl border border-slate-300 bg-[#f4f7fb] px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-500 focus:border-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-white"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium font-michroma text-white hover:opacity-90 dark:bg-white dark:text-black transition-opacity disabled:opacity-50 mt-2"
					>
						{isSubmitting
							? "Processing..."
							: isSignUp
								? "Create Account"
								: "Sign In"}
					</button>
				</form>

				<div className="text-center pt-2">
					<button
						type="button"
						onClick={() => setIsSignUp(!isSignUp)}
						className="text-xs text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white underline transition-colors"
					>
						{isSignUp
							? "Already registered? Sign In"
							: "New to Animus? Create an account"}
					</button>
				</div>
			</div>
		</section>
	);
}
