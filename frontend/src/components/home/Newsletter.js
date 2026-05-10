'use client';
import { Button } from "@/components/ui/Button";

const Newsletter = () => {
  return (
    <section className="py-24 bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-500 mb-4">Stay Armed</h2>
          <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
            Join the inner circle and get 15% off your first order.
          </h3>
          
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR@EMAIL.COM" 
              className="flex-grow bg-transparent border-b border-zinc-700 p-4 focus:outline-none focus:border-white transition-colors uppercase tracking-widest text-sm"
            />
            <Button variant="outline" className="bg-white border-white text-black hover:bg-zinc-200">
              Subscribe
            </Button>
          </form>
          
          <p className="mt-8 text-xs text-zinc-500 uppercase tracking-widest leading-loose">
            By subscribing, you agree to our Privacy Policy and Terms of Service. 
            We promise to only send you the good stuff.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
