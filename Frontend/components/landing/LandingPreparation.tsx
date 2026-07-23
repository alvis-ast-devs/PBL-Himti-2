import { preparationGroups } from "./landing-content";

export function LandingPreparation() {
  return (
    <section
      id="prepare"
      className="scroll-mt-24 bg-brand-pale py-16 sm:py-20 lg:py-24"
      aria-labelledby="prepare-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
            Before you begin
          </p>
          <h2
            id="prepare-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            What to prepare
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            Having these details ready will make the application easier to
            complete.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {preparationGroups.map((group) => (
            <article
              key={group.label}
              className="rounded-2xl border border-line bg-card p-6 sm:p-7"
            >
              <h3 className="text-xl font-bold text-ink">{group.label}</h3>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-muted"
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-line bg-brand-light px-5 py-4 text-sm leading-6 text-brand-dark">
          <strong>Important:</strong> The publication deadline cannot be later
          than the event date.
        </div>
      </div>
    </section>
  );
}
