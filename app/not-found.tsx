import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="container-tight text-center">
        <span className="eyebrow">404 · Not found</span>
        <h1 className="heading-lg mt-4 text-balance">
          That page seems to have wandered off.
        </h1>
        <p className="mt-3 max-w-md mx-auto text-ink-muted">
          The link may be broken or the page may have moved. Let’s get you back home.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
        >
          Go to homepage
        </Link>
      </div>
    </section>
  );
}
