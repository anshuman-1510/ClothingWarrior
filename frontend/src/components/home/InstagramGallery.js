'use client';
import { Camera } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acd4b?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop',
];

const InstagramGallery = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400 mb-2">On the Field</h2>
          <h3 className="text-4xl font-bold uppercase tracking-tighter">Instagram Gallery</h3>
        </div>
        <a href="#" className="flex items-center space-x-2 text-sm uppercase tracking-widest font-bold hover:text-zinc-500 transition-colors">
            <Camera className="w-4 h-4" />
          <span>@clothingwarrior</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {images.map((img, index) => (
          <div key={index} className="aspect-square relative group overflow-hidden">
            <img 
              src={img} 
              alt="Instagram" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Camera className="text-white w-8 h-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
