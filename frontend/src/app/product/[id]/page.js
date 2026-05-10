'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);

        // Fetch related products
        const { data: related } = await axios.get(`/api/products?category=${data.category?._id || data.category}`);
        setRelatedProducts(related.products.filter(p => p._id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    addToCart(product, qty, selectedSize, selectedColor);
    toast.success('Added to cart');
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">Loading...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-24">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative">
            <img
              src={product.images[selectedImage] || 'https://via.placeholder.com/600x800'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-[3/4] bg-zinc-100 overflow-hidden border-2",
                  selectedImage === idx ? "border-black" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400 mb-2">{product.category?.name}</p>
            <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">{product.name}</h1>
            <p className="text-2xl font-medium">₹{product.price.toLocaleString()}</p>
          </div>

          <p className="text-zinc-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6">
            {product.sizes?.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 border flex items-center justify-center text-xs font-bold transition-all",
                        selectedSize === size ? "bg-black text-white border-black" : "bg-white text-black border-zinc-200 hover:border-black"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors?.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all",
                        selectedColor === color ? "bg-black text-white border-black" : "bg-white text-black border-zinc-200 hover:border-black"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Quantity</h3>
              <div className="flex items-center space-x-4 border border-zinc-200 w-fit">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-zinc-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="p-3 hover:bg-zinc-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button 
              className="w-full py-8 text-lg" 
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest text-center">
              Free shipping on orders over ₹10,000. Secured payment.
            </p>
          </div>

          <div className="pt-10 border-t border-zinc-100 space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-zinc-400">SKU:</span>
              <span className="font-bold">{product.sku}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-zinc-400">Availability:</span>
              <span className={product.stockQuantity > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-32">
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-12">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <a key={p._id} href={`/product/${p._id}`} className="group">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4">
                  <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-1">{p.name}</h3>
                <p className="text-sm text-zinc-500">₹{p.price.toLocaleString()}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
