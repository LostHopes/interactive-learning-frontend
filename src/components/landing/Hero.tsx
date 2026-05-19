import { Link } from "react-router";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      <div className="absolute top-0 right-0 w-[60%] h-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(139,115,85,0.15) 0%, transparent 70%)'
        }}
      />
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 30% 80%, rgba(139,115,85,0.1) 0%, transparent 60%)'
        }}
      />

      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ fontFamily: 'var(--font-body)' }}>
            Learn by doing
          </p>

          <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-semibold text-[var(--color-text)] leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-display)' }}>
            Master any subject,
            <br />
            <span className="text-[var(--color-accent)]">interactively</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-12 max-w-xl">
            Hands-on exercises, real-time feedback, and personalized learning paths
            guided by an intelligent assistant that adapts to you.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium rounded-xl transition-all duration-200 text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] font-medium rounded-xl transition-all duration-200 text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
