'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Clock, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/orders', config);
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeliver = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/orders/${id}/deliver`, {}, config);
      toast.success('Order marked as delivered');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Orders</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest mt-1">Manage customer fulfillment</p>
        </header>

        <div className="bg-white border border-zinc-100 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Paid</th>
                <th className="px-6 py-4">Delivered</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-[10px]">#{order._id.slice(-8)}</td>
                  <td className="px-6 py-4 font-bold uppercase tracking-tight">{order.user?.name || 'Guest'}</td>
                  <td className="px-6 py-4 text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">₹{order.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" /> {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-red-600">
                        <Clock className="w-3 h-3 mr-1" /> Not Paid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" /> {new Date(order.deliveredAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center text-[10px] uppercase tracking-widest font-bold text-amber-600">
                        <Clock className="w-3 h-3 mr-1" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                       {!order.isDelivered && order.isPaid && (
                         <Button variant="outline" size="sm" onClick={() => handleDeliver(order._id)}>
                            Mark Delivered
                         </Button>
                       )}
                       <button className="p-2 hover:bg-zinc-100"><Eye className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
