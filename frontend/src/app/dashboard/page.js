'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import { Package, User as UserIcon, LogOut, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const UserDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (authLoading || loading) return <div className="max-w-7xl mx-auto px-4 py-24">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-tighter mb-8">Account</h1>
          <button
            onClick={() => setActiveTab('orders')}
            className={cn(
              "w-full flex items-center space-x-4 p-4 text-xs uppercase tracking-widest font-bold transition-colors",
              activeTab === 'orders' ? "bg-black text-white" : "hover:bg-zinc-100"
            )}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              "w-full flex items-center space-x-4 p-4 text-xs uppercase tracking-widest font-bold transition-colors",
              activeTab === 'profile' ? "bg-black text-white" : "hover:bg-zinc-100"
            )}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-4 p-4 text-xs uppercase tracking-widest font-bold hover:bg-red-50 hover:text-red-600 transition-colors mt-8"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow">
          {activeTab === 'orders' ? (
            <div className="space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-tighter pb-4 border-b border-zinc-100">Order History</h2>
              {orders.length === 0 ? (
                <div className="py-12 text-center bg-zinc-50">
                  <p className="text-zinc-500 uppercase tracking-widest text-sm">You haven't placed any orders yet.</p>
                  <Button className="mt-6" onClick={() => router.push('/shop')}>Shop Now</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-zinc-100 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <p className="text-[10px] uppercase text-zinc-400 tracking-widest mb-1 font-bold">Order ID: {order._id}</p>
                          <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{order.totalPrice.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {order.isPaid ? (
                              <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" /> Paid
                              </span>
                            ) : (
                              <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-amber-600">
                                <Clock className="w-3 h-3 mr-1" /> Payment Pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="w-16 h-20 bg-zinc-100 flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" title={item.name} />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-50 flex justify-between items-center">
                         <div className="text-[10px] uppercase tracking-widest font-bold">
                            Status: <span className={order.isDelivered ? "text-black" : "text-zinc-400"}>
                              {order.isDelivered ? "Delivered" : "Processing"}
                            </span>
                         </div>
                         <button className="text-[10px] uppercase tracking-[0.2em] font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-md space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-tighter pb-4 border-b border-zinc-100">Profile Settings</h2>
              <div className="space-y-6">
                 <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Name</label>
                   <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full border border-zinc-200 p-3 text-sm focus:outline-none focus:border-black uppercase tracking-widest"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Email Address</label>
                   <input 
                    type="email" 
                    defaultValue={user?.email}
                    disabled
                    className="w-full border border-zinc-200 p-3 text-sm bg-zinc-50 text-zinc-400 cursor-not-allowed uppercase tracking-widest"
                   />
                 </div>
                 <Button disabled className="w-full py-6">Update Profile (Coming Soon)</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
