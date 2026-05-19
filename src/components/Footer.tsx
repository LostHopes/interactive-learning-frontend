import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-[var(--color-bg-alt)] border-t border-[var(--color-border)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="text-2xl font-semibold text-[var(--color-text)] mb-4 block" style={{ fontFamily: 'var(--font-display)' }}>
              Interactive Learning
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
              Master any subject through interactive learning experiences powered by AI.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Home</Link></li>
              <li><Link to="/login" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Login</Link></li>
              <li><Link to="/register" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-text)] font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8 text-center text-[var(--color-text-muted)] text-sm">
          <p>&copy; {new Date().getFullYear()} Interactive Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
