import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: LoginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (LoginError) {
      setError(LoginError.message);
      setLoading(false);
      return;
    }
    window.location.href = "/home";
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center relative overflow-hidden px-4 py-12 select-none">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Cozy header logo and text */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center shadow-lg shadow-brand-orange/20 mb-4 transform hover:rotate-3 transition-transform duration-300">
            {/* Elegant book/study icon */}
            <svg
              className="w-8 h-8 text-brand-bg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-text mb-2 animate-fade-in">
            Welcome back
          </h1>
          <p className="text-sm text-brand-muted">
            Step into your cozy study nook at <span className="font-semibold text-brand-amber">PeerUp</span>.
          </p>
        </div>

        {/* Card containing the login form */}
        <div className="bg-brand-card/80 backdrop-blur-md rounded-3xl border border-brand-text/5 p-8 shadow-2xl shadow-black/45">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-muted/50">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-brand-bg/50 border border-brand-text/10 rounded-2xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/25 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-muted/50">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-brand-bg/50 border border-brand-text/10 rounded-2xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/25 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-4 bg-brand-error/10 border border-brand-error/20 rounded-2xl text-brand-error text-sm">
                <svg
                  className="h-5 w-5 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-brand-amber to-brand-orange hover:from-brand-amber/95 hover:to-brand-orange/95 text-brand-bg font-bold rounded-2xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-brand-amber/10 focus:outline-none focus:ring-2 focus:ring-brand-amber/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-brand-bg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Entering cozy space...</span>
                </>
              ) : (
                "Enter study room"
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <Link
              to="/signup"
              className="text-sm font-medium text-brand-muted hover:text-brand-amber transition-colors duration-200 inline-flex items-center gap-1.5 hover:underline underline-offset-4"
            >
              Don't have an account? Sign up
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/home"
              className="text-sm font-medium text-brand-muted hover:text-brand-amber transition-colors duration-200 inline-flex items-center gap-1.5 hover:underline underline-offset-4"
            >
             Browse as a guest
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
