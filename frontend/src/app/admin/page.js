'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';

const AdminOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('/api/orders', config),
          axios.get('/api/products')
        ]);
        
        const orders = ordersRes.data;
        const totalSales = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
        
        setStats({
          totalSales,
          totalOrders: orders.length,
          totalProducts: productsRes.data.length,
          totalUsers: 0 // In a real app, fetch users count
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const cards = [
    { name: 'Total Revenue', value: `₹${stats.totalSales.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', up: true },
    { name: 'Orders', value: stats.totalOrders, icon: ShoppingBag, trend: '+3.2%', up: true },
    { name: 'Products', value: stats.totalProducts, icon: TrendingUp, trend: '-2.1%', up: false },
    { name: 'Users', value: stats.totalUsers, icon: Users, trend: '+5.4%', up: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Dashboard Overview</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest mt-1">Welcome back, {user?.name}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.name} className="bg-white p-6 border border-zinc-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-50 rounded-none">
                  <card.icon className="w-5 h-5" />
                </div>
                <div className={cn("flex items-center text-[10px] font-bold uppercase tracking-widest", card.up ? "text-green-600" : "text-red-600")}>
                  {card.trend}
                  {card.up ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">{card.name}</h3>
              <p className="text-2xl font-bold tracking-tight">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-white border border-zinc-100 shadow-sm p-8">
              <h2 className="text-lg font-bold uppercase tracking-tighter mb-8 border-b border-zinc-50 pb-4">Recent Orders</h2>
              <div className="space-y-6">
                 {recentOrders.length > 0 ? recentOrders.map((order) => (
                   <div key={order._id} className="flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <p className="font-bold uppercase tracking-tight">#{order._id.slice(-6)}</p>
                        <p className="text-zinc-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.totalPrice.toLocaleString()}</p>
                        <p className={cn("uppercase tracking-widest font-bold", order.isPaid ? "text-green-600" : "text-amber-600")}>
                           {order.isPaid ? "Paid" : "Unpaid"}
                        </p>
                      </div>
                   </div>
                 )) : <p className="text-zinc-400 uppercase tracking-widest text-xs text-center py-8">No recent orders.</p>}
              </div>
           </div>

           <div className="bg-white border border-zinc-100 shadow-sm p-8">
              <h2 className="text-lg font-bold uppercase tracking-tighter mb-8 border-b border-zinc-50 pb-4">Best Sellers</h2>
              <div className="space-y-8 py-4 text-center">
                 <BarChart3 className="w-16 h-16 text-zinc-100 mx-auto" />
                 <p className="text-zinc-400 uppercase tracking-widest text-xs">Analytics data will appear here as you grow.</p>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

import { cn } from '@/lib/utils';
export default AdminOverview;
