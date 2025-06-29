export const metadata = {
  title: "About – Neqo360",
};

export default function AboutPage() {
  const team = [
    "Jane Doe – Founder",
    "John Smith – Lead Engineer",
    "Mary Johnson – Product Designer",
  ];

  return (
    <main className="px-6 md:px-16 py-32 max-w-2xl mx-auto">
      <blockquote className="text-[clamp(2rem,5vw,3rem)] font-black leading-tight mb-16">
        “Code is poetry. We&apos;re poets.”
      </blockquote>
      <ul className="text-xs text-gray-600 space-y-1">
        {team.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </main>
  );
} 