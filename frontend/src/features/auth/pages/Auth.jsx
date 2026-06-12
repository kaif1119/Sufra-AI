const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/$/,
  "",
);

const highlights = [
  "Secure Google sign-in",
  "Saved conversation history",
  "Works on every screen",
];

const Auth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-[100dvh] bg-[#f3f6fa] px-4 py-5 font-['Inter',sans-serif] text-[#111827] sm:px-6 lg:px-8">
      <main className="mx-auto grid min-h-[calc(100dvh-2.5rem)] w-full max-w-6xl overflow-hidden rounded-lg border border-[#d8dee8] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_0.86fr]">
        <section className="hidden bg-[#111827] px-10 py-10 text-white lg:flex lg:flex-col xl:px-12">
          <div className="bg-[#111827]">
            <p className="text-3xl font-semibold tracking-tight xl:text-4xl">
              Sufra AI
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#cbd5e1]">
              Your focused workspace for clear thinking, planning, and everyday
              conversations.
            </p>
          </div>

          <div className="mt-16 max-w-lg">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#93c5fd]">
              Built for flow
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
              Start smarter conversations in seconds.
            </h1>
          </div>

          <div className="mt-auto space-y-4 border-t border-white/10 pt-8">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 text-sm text-[#e5e7eb]"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dff6eb]">
                  <span className="h-2 w-2 rounded-full bg-[#087443]" />
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-[100dvh] items-center px-5 py-8 sm:px-10 lg:min-h-0 lg:px-12">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-9 rounded-lg bg-[#111827] px-5 py-6 text-center shadow-sm lg:hidden">
              <p className="text-4xl font-semibold tracking-tight text-white">
                Sufra AI
              </p>
              <p className="mt-2 text-sm font-medium text-[#cbd5e1]">
                Personal AI workspace
              </p>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">
              Welcome
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#121212] sm:text-4xl">
              Sign in to continue
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5d6678]">
              Access your chats, start new ideas, and keep your workspace
              synced.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-lg border border-[#cfd8e3] bg-white px-4 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#111827] hover:bg-[#f8fafc] sm:px-6 sm:py-4 sm:text-[15px]"
            >
              <svg className="h-[22px] w-[22px] shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="min-w-0 truncate">Continue with Google</span>
            </button>

            <div className="mt-8 rounded-lg border border-[#e6ebf2] bg-[#fbfcfe] px-4 py-4">
              <p className="text-sm font-semibold text-[#273142]">
                One account. Your full workspace.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#697386]">
                We use Google sign-in to keep your conversations private and
                easy to restore.
              </p>
            </div>

            <p className="mt-8 text-center text-xs leading-6 text-[#858383] sm:text-[13px]">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-[#121212] decoration-[#cfd8e3] underline-offset-4 transition-colors hover:underline hover:decoration-[#121212]"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-[#121212] decoration-[#cfd8e3] underline-offset-4 transition-colors hover:underline hover:decoration-[#121212]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Auth;
