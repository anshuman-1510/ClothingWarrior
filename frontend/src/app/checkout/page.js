'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import Script from 'next/script';

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
    }
    if (cartItems.length === 0) {
      router.push('/shop');
    }
  }, [user, cartItems, router]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: { address, city, postalCode, country, phone },
          paymentMethod: 'Razorpay',
          totalPrice: subtotal,
        },
        config
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: 'Clothing Warrior',
        description: 'Payment for your order',
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          try {
            await axios.post(
              '/api/orders/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.order._id,
              },
              config
            );
            toast.success('Payment successful!');
            clearCart();
            router.push(`/dashboard?order=${data.order._id}`);
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: phone,
        },
        theme: {
          color: '#000000',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tighter mb-8 pb-2 border-b border-zinc-100">Shipping Details</h2>
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Address</label>
              <input
                type="text"
                className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-xs"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">City</label>
                <input
                  type="text"
                  className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-xs"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Postal Code</label>
                <input
                  type="text"
                  className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-xs"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Phone</label>
              <input
                type="text"
                className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-xs"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full py-8 text-lg" disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${subtotal.toLocaleString()}`}
            </Button>
          </form>
        </div>

        <div className="bg-zinc-50 p-8 h-fit">
          <h2 className="text-xl font-bold uppercase tracking-tighter mb-8">Order Summary</h2>
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={`${item.product}-${item.size}-${item.color}`} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-zinc-200 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-tight leading-tight">{item.name}</p>
                    <p className="text-[10px] uppercase text-zinc-400 tracking-widest">{item.qty} × {item.size} / {item.color}</p>
                  </div>
                </div>
                <p className="font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-zinc-200 space-y-4">
            <div className="flex justify-between text-sm uppercase tracking-widest">
              <span className="text-zinc-500">Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm uppercase tracking-widest font-bold">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
