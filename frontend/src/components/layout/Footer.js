import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold tracking-tighter uppercase mb-6">Clothing Warrior</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Premium fashion brand dedicated to those who fight for their style. Minimalist design, maximal impact.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li><Link href="/shop" className="hover:text-black">All Collections</Link></li>
              <li><Link href="/shop?category=new" className="hover:text-black">New Arrivals</Link></li>
              <li><Link href="/shop?category=best" className="hover:text-black">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-black">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-black">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li><a href="#" className="hover:text-black">Instagram</a></li>
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Clothing Warrior. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
