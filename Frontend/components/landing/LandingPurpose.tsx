import { partnerHubBenefits } from "./landing-content";

export function LandingPurpose() {
  return (
    <section
      id="purpose"
      className="scroll-mt-24 bg-card py-16 sm:py-20 lg:py-24"
      aria-labelledby="purpose-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
            A focused partnership portal
          </p>
          <h2
            id="purpose-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            What PartnerHub helps you do
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Keep the application, review feedback, and agreed deliverables
            together instead of spreading them across separate conversations.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partnerHubBenefits.map((benefit) => (
            <article
              key={benefit.number}
              className="rounded-2xl border border-line bg-card p-6 shadow-[0_12px_35px_rgba(0,74,130,0.07)] sm:p-7"
            >
              <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg bg-brand-light px-3 text-sm font-bold text-brand-dark">
                {benefit.number}
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
