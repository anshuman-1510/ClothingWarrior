import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-zinc-900">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 hover:scale-100"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
          Style is <br /> our <span className="text-zinc-400 italic font-light">Weapon</span>
        </h1>
        <p className="text-zinc-200 text-lg md:text-xl max-w-xl mb-8 uppercase tracking-widest font-light">
          Premium streetwear for the modern urban warrior. Redefine your armor.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" className="bg-white border-white text-black hover:bg-black hover:text-white" size="lg">
            <Link href="/shop">Shop Collection</Link>
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" size="lg">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-white/50" />
      </div>
    </section>
  );
};

export default Hero;
