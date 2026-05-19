import { useState } from "react";

const benefits = {
  assistant: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      title: "Always Available",
      description: "Get instant help anytime — no waiting for office hours or tutor availability."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      title: "Personalized Explanations",
      description: "Complex concepts broken down to your level, with examples that make sense to you."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Instant Feedback",
      description: "Know exactly where you stand with real-time analysis of your answers and approach."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: "Adaptive Learning",
      description: "The assistant learns your patterns and adjusts difficulty to keep you in the flow."
    }
  ],
  tasks: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Hands-on Exercises",
      description: "Practice with interactive problems designed to build real understanding, not memorization."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Real-world Scenarios",
      description: "Apply knowledge to practical situations that mirror actual challenges you'll face."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: "Progress Tracking",
      description: "Visual dashboards show your growth, strengths, and areas that need more practice."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: "Skill Validation",
      description: "Earn badges and certificates that prove your competence to employers and peers."
    }
  ]
};

type TabKey = keyof typeof benefits;

function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("assistant");

  return (
    <section className="py-24 px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            Why learn with us
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
            Two powerful approaches working together to accelerate your learning
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--color-surface)] rounded-xl p-1.5 border border-[var(--color-border-light)]">
            <button
              onClick={() => setActiveTab("assistant")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "assistant"
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "tasks"
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              Interactive Tasks
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits[activeTab].map((benefit, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="group p-6 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-2xl hover:border-[var(--color-border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{
                animation: `fadeUp 0.5s ease-out ${index * 0.08}s both`
              }}
            >
              <div className="text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2"
                style={{ fontFamily: 'var(--font-display)' }}>
                {benefit.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
