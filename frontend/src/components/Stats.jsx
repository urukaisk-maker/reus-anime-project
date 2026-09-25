export default function Stats({ locations, categories, people, messages }) {
  const stats = [
    { label: "Zones", value: locations },
    { label: "Categories", value: categories },
    { label: "Personatges", value: people },
    { label: "Missatges", value: messages }
  ];
  return (
    <section className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value">{String(s.value).padStart(2, "0")}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  );
}
