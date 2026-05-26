const stats = [
  { value: "Since 2014", label: "In practice" },
  { value: "1,000+", label: "Patients treated" },
  { value: "2", label: "International certifications" },
  { value: "7 days", label: "Open every week" },
];

export function StatsBar() {
  return (
    <section className="bg-brand-gradient py-14">
      <div className="container-tight">
        <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-3xl sm:text-4xl font-bold text-white">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm text-white/60">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
