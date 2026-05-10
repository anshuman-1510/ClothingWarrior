'use client';
import { Mail, Phone, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">Contact Us</h1>
            <p className="text-zinc-500 uppercase tracking-widest text-sm">We're here to help with your armor.</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <Mail className="w-6 h-6 mt-1" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Email</p>
                <p className="text-lg font-bold">support@clothingwarrior.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <Phone className="w-6 h-6 mt-1" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Phone</p>
                <p className="text-lg font-bold">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <MapPin className="w-6 h-6 mt-1" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">HQ</p>
                <p className="text-lg font-bold">Warrior Tower, Sector 44, Gurgaon, India</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-100 flex space-x-8">
             <a href="#" className="hover:text-zinc-500"><Camera className="w-6 h-6" /></a>
             {/* Other icons */}
          </div>
        </div>

        <div className="bg-zinc-50 p-12">
          <h2 className="text-xl font-bold uppercase tracking-tighter mb-8">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
               <div>
                 <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">First Name</label>
                 <input className="w-full border-b border-zinc-300 bg-transparent py-3 focus:outline-none focus:border-black uppercase text-xs" />
               </div>
               <div>
                 <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Last Name</label>
                 <input className="w-full border-b border-zinc-300 bg-transparent py-3 focus:outline-none focus:border-black uppercase text-xs" />
               </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Email</label>
              <input className="w-full border-b border-zinc-300 bg-transparent py-3 focus:outline-none focus:border-black uppercase text-xs" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Message</label>
              <textarea className="w-full border-b border-zinc-300 bg-transparent py-3 focus:outline-none focus:border-black min-h-[100px]" />
            </div>
            <Button className="w-full py-6">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
