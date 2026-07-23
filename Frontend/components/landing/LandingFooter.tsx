import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-8">
        <div className="flex max-w-lg gap-5">
          <Image
            src="/brand/himti-lockup.png"
            alt="HIMTI BINUS University"
            width={120}
            height={120}
            className="h-24 w-24 shrink-0 object-contain"
          />
          <div>
            <p className="text-xl font-bold text-brand-dark">PartnerHub</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              A focused application portal for organizations seeking a media
              partnership with HIMTI BINUS University.
            </p>
            <p className="mt-4 text-xs text-muted">
              © {currentYear} HIMTI BINUS University.
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
            Navigate
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href="#purpose" className="hover:text-brand">
                What PartnerHub Does
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-brand">
                Application Process
              </a>
            </li>
            <li>
              <a href="#prepare" className="hover:text-brand">
                What to Prepare
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
            Continue
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/register" className="hover:text-brand">
                Register as a partner
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-brand">
                Log in
              </Link>
            </li>
            <li>
              <a
                href="https://ofog.himtibinus.or.id/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                HIMTI Official Website <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
