function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up for free and set your learning goals based on your experience level and interests."
    },
    {
      number: "02",
      title: "Choose Your Path",
      description: "Select from curated tracks or create a custom learning journey tailored to your needs."
    },
    {
      number: "03",
      title: "Start Learning",
      description: "Complete interactive exercises with your AI assistant guiding you every step of the way."
    }
  ];

  return (
    <section className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            How it works
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
            Three steps to begin your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-[var(--color-border)]" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold mb-6 relative z-10"
                style={{ fontFamily: 'var(--font-display)' }}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}>
                {step.title}
              </h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
