const testimonials = [
  {
    quote: "The quality of the fabric is unmatched. It feels like wearing high-end tactical gear, but for every day.",
    author: "James R.",
    role: "Urban Photographer"
  },
  {
    quote: "Finally a brand that understands minimalist aesthetics without compromising on the warrior spirit.",
    author: "Elena M.",
    role: "Digital Artist"
  },
  {
    quote: "Every piece I've bought from Clothing Warrior has become a staple in my wardrobe. Fast delivery too.",
    author: "Vikram S.",
    role: "Creative Director"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {testimonials.map((t, index) => (
          <div key={index} className="flex flex-col">
            <div className="text-4xl text-zinc-200 font-serif mb-6">"</div>
            <p className="text-xl text-zinc-600 font-medium mb-8 leading-relaxed italic">
              {t.quote}
            </p>
            <div className="mt-auto">
              <span className="block font-bold uppercase tracking-widest text-sm">{t.author}</span>
              <span className="block text-xs text-zinc-400 uppercase tracking-widest mt-1">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
