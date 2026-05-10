'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName) return;
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/categories', { name: newName }, config);
      toast.success('Category added');
      setNewName('');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this category?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/categories/${id}`, config);
        toast.success('Category removed');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-12">
        <header>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Categories</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest mt-1">Manage product classification</p>
        </header>

        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            className="flex-grow border border-zinc-200 p-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black"
            placeholder="NEW CATEGORY NAME"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </form>

        <div className="bg-white border border-zinc-100">
          <div className="divide-y divide-zinc-50">
            {categories.map((cat) => (
              <div key={cat._id} className="p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                <span className="text-sm font-bold uppercase tracking-widest">{cat.name}</span>
                <button onClick={() => handleDelete(cat._id)} className="text-red-600 p-2 hover:bg-red-50">
                   <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
