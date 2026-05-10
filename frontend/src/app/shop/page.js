'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(`/api/products?search=${search}&category=${category}&sort=${sort}`),
          axios.get('/api/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">Shop All</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest">{products.length} Products Found</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search armor..."
              className="w-full md:w-64 border border-zinc-200 p-2 pl-10 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>

          <button 
            className="flex items-center space-x-2 border border-zinc-200 px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-zinc-50 transition-colors"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-zinc-200 px-4 py-2 pr-10 text-xs uppercase tracking-widest font-bold focus:outline-none cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low-High</option>
              <option value="price-high-low">Price: High-Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-zinc-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-zinc-200 mb-4" />
              <div className="h-4 bg-zinc-200 w-3/4 mb-2" />
              <div className="h-4 bg-zinc-200 w-1/4" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 relative">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/600x800'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.stockQuantity === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold">Sold Out</span>
                  </div>
                )}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-1 group-hover:underline">{product.name}</h3>
              <p className="text-sm font-medium text-zinc-500">₹{product.price.toLocaleString()}</p>
              <p className="text-[10px] uppercase text-zinc-400 tracking-widest mt-1">{product.category?.name}</p>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <p className="text-zinc-500 uppercase tracking-widest">No products found for this criteria.</p>
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300",
        isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "absolute right-0 top-0 h-full w-full max-w-xs bg-white p-8 transition-transform duration-300",
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-bold uppercase tracking-tighter">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Category</h3>
              <div className="flex flex-col space-y-3">
                <button 
                  className={cn("text-sm text-left uppercase tracking-widest hover:text-black transition-colors", category === '' ? "font-bold text-black" : "text-zinc-500")}
                  onClick={() => setCategory('')}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat._id}
                    className={cn("text-sm text-left uppercase tracking-widest hover:text-black transition-colors", category === cat._id ? "font-bold text-black" : "text-zinc-500")}
                    onClick={() => setCategory(cat._id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button key={size} className="w-10 h-10 border border-zinc-200 flex items-center justify-center text-[10px] font-bold hover:border-black transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-bold"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
