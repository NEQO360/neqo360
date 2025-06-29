import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col justify-center items-start px-6 md:px-16 min-h-[calc(100vh-4rem)] gap-10">
        <h1 className="font-headline text-[clamp(3rem,8vw,6rem)] font-black leading-tight">
          We Build Software
        </h1>
        <p className="text-gray-600 text-base max-w-md">
          Modern stack. Clean code.
        </p>
        <Link
          href="/contact"
          className="glass text-white bg-black/80 hover:bg-black transition-colors px-8 py-3 rounded-s"
        >
          Let&rsquo;s Talk
        </Link>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-16 py-24 flex flex-col md:flex-row gap-8 md:gap-20 text-[clamp(2rem,6vw,4rem)] font-black">
        {[
          { label: "Web.", desc: "Fast, scalable web apps." },
          { label: "Mobile.", desc: "Native-quality mobile experiences." },
          { label: "Systems.", desc: "Integrated backend solutions." },
        ].map((item) => (
          <div key={item.label} className="group">
            <div className="relative inline-block">
              <span className="group-hover:opacity-70 transition-opacity">
                {item.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Selected Work Placeholder */}
      <section className="px-6 md:px-16 py-24">
        <h2 className="text-2xl font-bold mb-8">Selected Work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-[4/3] bg-gray-200 rounded-m overflow-hidden group cursor-pointer"
            >
              <div className="w-full h-full bg-gray-400 grayscale group-hover:grayscale-0 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
