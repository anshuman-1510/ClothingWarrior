import Link from 'next/link';

const collections = [
  {
    name: 'Winter Armor',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    href: '/shop?category=winter'
  },
  {
    name: 'Urban Tactical',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    href: '/shop?category=urban'
  },
  {
    name: 'Essence Wear',
    image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=2071&auto=format&fit=crop',
    href: '/shop?category=essence'
  }
];

const FeaturedCollections = () => {
  return (
    <section id="collections" className="py-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400 mb-2">Curated</h2>
          <h3 className="text-4xl font-bold uppercase tracking-tighter">Featured Collections</h3>
        </div>
        <Link href="/shop" className="text-sm uppercase tracking-widest font-bold border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-all">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((col) => (
          <Link key={col.name} href={col.href} className="group relative aspect-[3/4] overflow-hidden bg-zinc-100">
            <img 
              src={col.image} 
              alt={col.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-8 left-8">
              <h4 className="text-2xl font-bold text-white uppercase tracking-tighter mb-2">{col.name}</h4>
              <span className="text-xs text-white uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore Now &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
