export const metadata = {
  title: "Contact – Neqo360",
};

export default function ContactPage() {
  return (
    <main className="px-6 md:px-16 py-32 flex flex-col items-center text-center gap-12 max-w-xl mx-auto">
      <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-black leading-tight">
        Let&rsquo;s Work Together
      </h1>
      <a
        href="mailto:hello@neqo360.com"
        className="text-accent text-lg hover:underline"
      >
        hello@neqo360.com
      </a>
      <form className="w-full flex flex-col gap-6">
        <input
          type="text"
          placeholder="Name"
          className="glass rounded-m p-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="glass rounded-m p-4"
          required
        />
        <textarea
          placeholder="Project description"
          className="glass rounded-m p-4 h-40 resize-none"
          required
        />
        <button
          type="submit"
          className="glass bg-black text-white hover:bg-black/90 rounded-s py-3"
        >
          Submit
        </button>
      </form>
    </main>
  );
} 