import { useState } from 'react';
import { useAppState } from '../store';
import { Bill } from '../types';
import { Plus, Trash2, X, Save, FileText, Search } from 'lucide-react';

const emptyBill: Omit<Bill, 'id'> = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: 0,
  category: 'Feed',
  vendor: '',
};

export default function BillsPage() {
  const { bills, addBill, deleteBill } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyBill);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = ['Feed', 'Medical', 'Utilities', 'Salary', 'Maintenance', 'Transport', 'Equipment', 'Other'];

  const handleSave = () => {
    if (!form.description || form.amount <= 0) return;
    addBill({ ...form, id: Date.now().toString() });
    setShowForm(false);
    setForm(emptyBill);
  };

  const filtered = bills.filter(b => {
    const matchSearch = b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.vendor.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || b.category === catFilter;
    return matchSearch && matchCat;
  });

  const totalFiltered = filtered.reduce((sum, b) => sum + b.amount, 0);
  const totalAll = bills.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            Bills & <span className="text-saffron">Expenses</span> 💰
          </h1>
          <p className="text-gray-500 mt-1">Track all gaushala expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 gradient-saffron text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Add New Bill
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-500 font-medium">Total Bills</p>
          <p className="text-3xl font-black text-gray-800">{bills.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-500 font-medium">Total Amount</p>
          <p className="text-3xl font-black text-saffron">₹{totalAll.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-lg">
          <p className="text-sm text-gray-500 font-medium">Filtered Total</p>
          <p className="text-3xl font-black text-forest">₹{totalFiltered.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4 mb-6 shadow-md flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
          />
        </div>
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Bills Table */}
      <div className="glass-card rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 text-gray-500 font-semibold">Date</th>
                <th className="text-left py-4 px-4 text-gray-500 font-semibold">Description</th>
                <th className="text-left py-4 px-4 text-gray-500 font-semibold hidden sm:table-cell">Vendor</th>
                <th className="text-left py-4 px-4 text-gray-500 font-semibold">Category</th>
                <th className="text-right py-4 px-4 text-gray-500 font-semibold">Amount</th>
                <th className="text-center py-4 px-4 text-gray-500 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No bills found</p>
                  </td>
                </tr>
              ) : (
                filtered.map(bill => (
                  <tr key={bill.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{bill.date}</td>
                    <td className="py-4 px-4 font-medium text-gray-800">{bill.description}</td>
                    <td className="py-4 px-4 text-gray-500 hidden sm:table-cell">{bill.vendor}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-saffron-light text-saffron-dark rounded-lg text-xs font-bold">
                        {bill.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-800 whitespace-nowrap">₹{bill.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setDeleteConfirm(bill.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Bill Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-fadeInUp" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">➕ Add New Bill</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Description *</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Cattle Feed Purchase"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  value={form.amount || ''}
                  onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Vendor</label>
                <input
                  type="text"
                  value={form.vendor}
                  onChange={e => setForm({ ...form, vendor: e.target.value })}
                  placeholder="Vendor name"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!form.description || form.amount <= 0}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                  !form.description || form.amount <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'gradient-saffron hover:opacity-90'
                }`}
              >
                <Save className="w-5 h-5" /> Save Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-fadeInUp">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Bill?</h3>
            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { deleteBill(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
