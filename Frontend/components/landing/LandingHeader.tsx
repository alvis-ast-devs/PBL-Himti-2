import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  { label: "What PartnerHub Does", href: "#purpose" },
  { label: "Application Process", href: "#process" },
  { label: "What to Prepare", href: "#prepare" },
] as const;

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label="HIMTI PartnerHub home"
        >
          <Image
            src="/brand/himti-mark.png"
            alt=""
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
            PartnerHub
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md text-sm font-medium text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://ofog.himtibinus.or.id/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md text-sm font-medium text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            HIMTI Website <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Register as a partner
          </Link>
        </div>

        <details className="group relative sm:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-line bg-card text-brand-dark transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation</span>
            <span
              aria-hidden="true"
              className="flex w-5 flex-col gap-1.5 group-open:hidden"
            >
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
            </span>
            <span
              aria-hidden="true"
              className="hidden text-2xl leading-none group-open:block"
            >
              ×
            </span>
          </summary>
          <nav
            className="absolute right-0 top-14 w-72 rounded-xl border border-line bg-card p-3 shadow-xl"
            aria-label="Mobile navigation"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ink hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-brand"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://ofog.himtibinus.or.id/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-ink hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-brand"
            >
              HIMTI Official Website <span aria-hidden="true">↗</span>
            </a>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand px-3 text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-3 text-center text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-brand"
              >
                Register
              </Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
