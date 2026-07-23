import Image from "next/image";
import Link from "next/link";

const workflowHighlights = [
  ["Apply", "Event details and proposal URL"],
  ["Review", "Decision and revision notes"],
  ["Deliver", "Obligations and evidence links"],
] as const;

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-brand-pale">
      <div
        className="absolute -left-24 top-24 h-64 w-64 rounded-full border-[48px] border-brand-light/70"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-light/60"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-brand">
            HIMTI BINUS University
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Apply for a HIMTI media partnership in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            PartnerHub helps external organizations submit event and publication
            details, receive review decisions and revision notes, and complete
            agreed partnership obligations with HIMTI.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Start an application
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand bg-card px-6 text-base font-semibold text-brand transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Log in
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            Already registered? Log in to view your applications and admin
            feedback.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div
            className="absolute -inset-4 rotate-2 rounded-[2rem] bg-brand-light/70"
            aria-hidden="true"
          />
          <div className="relative rounded-[1.75rem] border border-line bg-card p-6 shadow-[0_24px_70px_rgba(0,74,130,0.14)] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center justify-center rounded-2xl bg-brand-pale p-4">
                <Image
                  src="/brand/himti-lockup.png"
                  alt="HIMTI BINUS University"
                  width={180}
                  height={180}
                  className="h-36 w-36 object-contain sm:h-40 sm:w-40"
                  priority
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  One Family One Goal
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">
                  From proposal to completed partnership.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  One clear workflow for organizations and HIMTI to review,
                  revise, and fulfil a media partnership agreement.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {workflowHighlights.map(([label, description]) => (
                <div
                  key={label}
                  className="rounded-xl border border-line bg-surface-soft p-4"
                >
                  <p className="text-sm font-bold text-brand-dark">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
