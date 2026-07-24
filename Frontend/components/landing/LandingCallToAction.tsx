import Link from "next/link";

export function LandingCallToAction() {
  return (
    <section className="bg-brand-dark py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-light">
          Start your application
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to collaborate with HIMTI?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-light sm:text-lg">
          Prepare your event information and proposal link, then create your
          partner account to begin.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Register as a partner
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
