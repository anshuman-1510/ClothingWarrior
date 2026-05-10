'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-8 text-zinc-200" />
        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-4">Your Cart is Empty</h1>
        <p className="text-zinc-500 uppercase tracking-widest mb-8">Looks like you haven't added anything to your armor yet.</p>
        <Button>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={`${item.product}-${item.size}-${item.color}`} className="flex gap-6 pb-8 border-b border-zinc-100">
              <div className="w-32 aspect-[3/4] bg-zinc-100 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight mb-1">{item.name}</h3>
                    <p className="text-[10px] uppercase text-zinc-400 tracking-widest">
                      Size: {item.size} | Color: {item.color}
                    </p>
                  </div>
                  <p className="text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 border border-zinc-200 w-fit">
                    <button 
                      onClick={() => updateQty(item.product, item.size, item.color, Math.max(1, item.qty - 1))}
                      className="p-2 hover:bg-zinc-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.product, item.size, item.color, Math.min(item.countInStock, item.qty + 1))}
                      className="p-2 hover:bg-zinc-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product, item.size, item.color)}
                    className="text-zinc-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-50 p-8 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-tighter mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm uppercase tracking-widest">
                <span className="text-zinc-500">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-widest">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between font-bold text-lg uppercase tracking-tight">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <Button className="w-full py-8 text-lg">
              <Link href="/checkout" className="flex items-center">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-loose">
                Prices and shipping costs are not confirmed until you reach the checkout.
              </p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-loose">
                30-day returns. Read more about <Link href="/returns" className="underline hover:text-black">Returns and Refunds</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
