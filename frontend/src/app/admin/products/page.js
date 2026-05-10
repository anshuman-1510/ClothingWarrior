'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    images: '',
    category: '',
    sizes: '',
    colors: '',
    stockQuantity: '',
    sku: '',
    featured: false
  });

  const fetchProducts = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ]);
      setProducts(pRes.data);
      setCategories(cRes.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images.join(','),
        category: product.category._id || product.category,
        sizes: product.sizes.join(','),
        colors: product.colors.join(','),
        stockQuantity: product.stockQuantity,
        sku: product.sku,
        featured: product.featured
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        images: '',
        category: categories[0]?._id || '',
        sizes: 'S,M,L,XL',
        colors: 'Black,White',
        stockQuantity: '10',
        sku: '',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const payload = {
      ...formData,
      images: formData.images.split(',').map(i => i.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim()),
      colors: formData.colors.split(',').map(c => c.trim()),
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity)
    };

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, payload, config);
        toast.success('Product updated');
      } else {
        await axios.post('/api/products', payload, config);
        toast.success('Product created');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Products</h1>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="bg-white border border-zinc-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product) => (
                <tr key={product._id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-12 bg-zinc-100 overflow-hidden">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold uppercase tracking-tight">{product.name}</td>
                  <td className="px-6 py-4 text-zinc-500">{product.sku}</td>
                  <td className="px-6 py-4 font-medium">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 text-[10px] font-bold uppercase tracking-widest", product.stockQuantity > 5 ? "bg-zinc-100 text-zinc-600" : "bg-red-50 text-red-600")}>
                      {product.stockQuantity} Left
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-zinc-100"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
              <h2 className="text-xl font-bold uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Name</label>
                  <input 
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black uppercase tracking-widest"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">SKU</label>
                  <input 
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black uppercase tracking-widest"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Description</label>
                <textarea 
                  className="w-full border p-3 text-xs focus:outline-none focus:border-black min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Price (₹)</label>
                  <input 
                    type="number"
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Stock</label>
                  <input 
                    type="number"
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Category</label>
                  <select 
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black uppercase tracking-widest"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Image URLs (comma separated)</label>
                <input 
                  className="w-full border p-3 text-xs focus:outline-none focus:border-black"
                  value={formData.images}
                  onChange={(e) => setFormData({...formData, images: e.target.value})}
                  placeholder="https://image1.jpg, https://image2.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Sizes (comma separated)</label>
                  <input 
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black uppercase tracking-widest"
                    value={formData.sizes}
                    onChange={(e) => setFormData({...formData, sizes: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Colors (comma separated)</label>
                  <input 
                    className="w-full border p-3 text-xs focus:outline-none focus:border-black uppercase tracking-widest"
                    value={formData.colors}
                    onChange={(e) => setFormData({...formData, colors: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="featured" 
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                />
                <label htmlFor="featured" className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">Featured Product</label>
              </div>

              <Button type="submit" className="w-full py-6">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
