const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 space-y-16">
      <header className="text-center">
        <h1 className="text-5xl font-bold uppercase">Our Story</h1>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-zinc-400">Forged in the urban battlefield</p>
      </header>

      <div className="aspect-video bg-zinc-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2070&auto=format&fit=crop" 
          alt="Brand" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-zinc max-w-none space-y-8 text-zinc-600 leading-relaxed text-lg">
        <p>
          Clothing Warrior was born out of a simple philosophy: clothing is your armor. In the modern world, how you present yourself is how you fight your battles. We don't just sell apparel; we provide the gear you need to conquer your day with confidence and style.
        </p>
        <p>
          Founded in 2024, our brand focuses on "Premium Minimalist Tactical" design. We blend high-performance fabrics with sharp, urban silhouettes inspired by the heritage of craftsmanship and the demands of the future.
        </p>
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight pt-8 border-t border-zinc-100">Our Mission</h2>
        <p>
          To empower the modern individual with high-quality, durable, and aesthetically superior fashion that transcends seasons and trends. We believe in "Less, but better."
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
