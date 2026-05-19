import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/errors";

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register({
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">

      <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden bg-[#5A4A3A] flex-col justify-center px-16 py-20 select-none">

        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, white 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, white 0%, transparent 35%)`
          }}
        />

        <div className="absolute top-16 right-12 w-48 h-48 rounded-full border border-white/10 animate-float" />
        <div className="absolute bottom-24 -left-12 w-56 h-56 rounded-full border border-white/[0.06] animate-float-reverse" />
        <div className="absolute top-1/3 left-8 w-2 h-24 bg-white/10 rounded-full animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-16 w-4 h-4 rounded-full bg-white/10 animate-float-reverse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 -translate-y-1/2 right-8 w-px h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-white/[0.03] font-display font-bold text-[20rem] leading-none pointer-events-none select-none">
          S
        </div>

        <div className="relative z-10 animate-fade-up">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-medium">Join</span>
          </div>

          <h1 className="text-white font-display text-5xl font-light leading-[1.15] tracking-tight">
            Start
          </h1>
          <h2 className="text-white/90 font-display text-5xl font-light italic leading-[1.15] tracking-tight mt-1">
            something new
          </h2>

          <div className="w-12 h-px bg-white/30 my-8" />

          <p className="text-white/55 text-sm leading-relaxed max-w-xs">
            Join a community of curious minds and unlock your potential through interactive courses crafted by experts.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/15 border-2 border-[#5A4A3A]"
                />
              ))}
            </div>
            <span className="text-white/40 text-xs">
              <span className="text-white/70 font-medium">500+</span> learners
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-16 right-16 flex items-center gap-4 z-10">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-white/20 text-[10px] uppercase tracking-[0.25em]">Interactive Learning</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          <div className="mb-10 animate-fade-up">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[var(--color-accent)]" />
              <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-[0.2em] font-medium">Join</span>
            </div>
            <h1 className="text-3xl font-display font-light text-[var(--color-text)] tracking-tight">
              Create account
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-2">
              Begin your learning journey today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50/80 border border-red-200/60 text-red-700 text-sm rounded-lg animate-fade-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="animate-fade-up delay-100">
            <div className="grid grid-cols-2 gap-3.5 mb-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Jane"
                  required
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Doe"
                  required
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="username" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Choose a username"
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="email" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="jane@example.com"
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div className="relative my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--color-border-light)]" />
              <svg className="w-3 h-3 text-[var(--color-text-muted)]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div className="flex-1 h-px bg-[var(--color-border-light)]" />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="password" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Create a password"
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label htmlFor="confirmPassword" className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-transparent border-b border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-accent-hover)] text-white text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[var(--color-text-muted)] mt-8 text-xs animate-fade-up delay-200">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default RegisterForm;
