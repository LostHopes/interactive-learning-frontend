import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";

function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username
    : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-lg border-b border-[var(--color-border-light)]">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Interactive Learning
        </Link>
        <div className="flex items-center gap-6">
          {isLoading ? null : isAuthenticated && user ? (
            <>
              <Link to="/courses" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm font-medium">
                Courses
              </Link>
              <Link to="/profile" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm font-medium">
                {displayName}
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 border border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] text-[var(--color-text)] text-sm font-medium rounded-lg transition-all duration-200 hover:cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
