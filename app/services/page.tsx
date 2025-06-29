export const metadata = {
  title: "Services – Neqo360",
};

const services = [
  {
    id: "01",
    title: "Web Development",
    desc: "We build fast, scalable web applications.",
    stack: "React, Next.js, Node.js",
  },
  {
    id: "02",
    title: "Mobile Development",
    desc: "Cross-platform apps that feel native.",
    stack: "React Native, Expo",
  },
  {
    id: "03",
    title: "Systems Integration",
    desc: "Bridging services, APIs, and infrastructure.",
    stack: "AWS, Docker, GraphQL",
  },
];

export default function ServicesPage() {
  return (
    <main className="px-6 md:px-16 py-32 space-y-24">
      {services.map((s, idx) => (
        <section
          key={s.id}
          className={`relative pl-20 md:pl-32 ${idx % 2 ? "md:ml-40" : ""}`}
        >
          <span className="absolute left-0 top-0 text-[clamp(4rem,12vw,8rem)] font-black opacity-10 select-none leading-none">
            {s.id}
          </span>
          <div className="glass p-10 rounded-l max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
            <p className="mb-2">{s.desc}</p>
            <p className="text-xs text-gray-600">{s.stack}</p>
          </div>
        </section>
      ))}
    </main>
  );
} 