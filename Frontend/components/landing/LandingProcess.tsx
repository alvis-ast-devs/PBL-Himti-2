import { applicationSteps } from "./landing-content";

export function LandingProcess() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
            Four clear steps
          </p>
          <h2
            id="process-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            How to apply for a media partnership
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Start with your organization account and continue through review,
            revision, and the agreed partnership work.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 lg:grid-cols-4">
          {applicationSteps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-line bg-card p-6"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
