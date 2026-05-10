import Link from 'next/link';

const BestSellers = () => {
  // Placeholder products for now
  const products = [
    { id: 1, name: 'Tactical Hoodie', price: 4999, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Warrior Tee', price: 1999, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop' },
    { id: 3, name: 'Cargo Pants', price: 3499, image: 'https://images.unsplash.com/photo-1624373266717-393999e122c7?q=80&w=1974&auto=format&fit=crop' },
    { id: 4, name: 'Stealth Jacket', price: 8999, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400 mb-2">Our Pride</h2>
          <h3 className="text-4xl font-bold uppercase tracking-tighter">Best Sellers</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-white mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1">
                  Popular
                </div>
              </div>
              <h4 className="text-sm font-bold uppercase tracking-tight mb-1">{product.name}</h4>
              <p className="text-sm text-zinc-500 font-medium">₹{product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
