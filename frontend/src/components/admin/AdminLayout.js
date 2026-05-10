'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  Package,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/');
    }
  }, [user, loading, router]);

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Customers', href: '/admin/users', icon: Users },
  ];

  if (loading || !user || !user.isAdmin) return <div className="p-24">Verifying Admin Access...</div>;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
            Clothing Warrior
          </Link>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 text-xs uppercase tracking-widest font-bold transition-colors",
                pathname === item.href ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-zinc-900">
           <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                 {user?.name?.charAt(0)}
              </div>
              <div className="overflow-hidden">
                 <p className="text-xs font-bold truncate">{user?.name}</p>
                 <p className="text-[10px] text-zinc-500 truncate">Administrator</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
