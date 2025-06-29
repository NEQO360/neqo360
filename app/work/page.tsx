"use client";

import { useState } from "react";

export const metadata = {
  title: "Work – Neqo360",
};

const projects = Array.from({ length: 6 }).map((_, idx) => ({
  id: idx,
  name: `Project ${idx + 1}`,
  img: `https://picsum.photos/seed/${idx}/600/400`,
}));

export default function WorkPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="px-6 md:px-16 py-32">
      <h1 className="text-4xl font-bold mb-12">Case Studies</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p.id)}
            className="group aspect-[4/3] overflow-hidden rounded-m cursor-pointer"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="absolute inset-0 flex items-end p-4 text-white text-lg opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/60 to-black/0 transition-opacity">
              {p.name}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center glass p-8"
          onClick={() => setOpen(null)}
        >
          <img src={projects[open].img} alt="full" className="max-h-[80vh] rounded-m" />
        </div>
      )}
    </main>
  );
} 