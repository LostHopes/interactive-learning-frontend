import { Link } from "react-router";

function CTA() {
  return (
    <section className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border-light)] p-12 md:p-16 text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)]" />

          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            Ready to begin?
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-lg mx-auto">
            Join learners who are building real skills through interactive practice and intelligent guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium rounded-xl transition-all duration-200"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] font-medium rounded-xl transition-all duration-200"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
