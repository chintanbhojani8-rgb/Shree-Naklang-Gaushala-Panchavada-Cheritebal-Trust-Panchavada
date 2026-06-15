import { useState } from 'react';
import { useAppState } from '../store';
import { Cow } from '../types';
import { Plus, Trash2, Edit, X, Save, Search } from 'lucide-react';

const emptyCow: Omit<Cow, 'id'> = {
  name: '', breed: 'ગીર', age: 1, gender: 'Female', health: 'Healthy',
  weight: '', color: '', tagNumber: '', photo: '', price: '', dateAdded: new Date().toISOString().split('T')[0], notes: '',
};

const defaultPhotos = [
  'https://images.pexels.com/photos/30147593/pexels-photo-30147593.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/35270836/pexels-photo-35270836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30604308/pexels-photo-30604308.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/36795118/pexels-photo-36795118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30147594/pexels-photo-30147594.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30147592/pexels-photo-30147592.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
];

export default function ManageCattle() {
  const { cows, addCow, updateCow, deleteCow } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCow);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyCow, photo: defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)] });
    setShowForm(true);
  };

  const openEdit = (cow: Cow) => {
    setEditingId(cow.id);
    setForm(cow);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.tagNumber) return;
    if (editingId) {
      updateCow({ ...form, id: editingId });
    } else {
      addCow({ ...form, id: Date.now().toString() });
    }
    setShowForm(false);
    setForm(emptyCow);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteCow(id);
    setDeleteConfirm(null);
  };

  const filtered = cows.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tagNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            Manage <span className="text-saffron">Cattle</span> 🐄
          </h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove cattle records</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 gradient-saffron text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Add New Cattle
        </button>
      </div>

      {/* Search */}
      <div className="glass-card rounded-xl p-4 mb-6 shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cattle by name or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
          />
        </div>
      </div>

      {/* Cattle List */}
      <div className="grid gap-4">
        {filtered.map(cow => (
          <div key={cow.id} className="glass-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={cow.photo}
                alt={cow.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{cow.name}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                    {cow.tagNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold text-white ${
                    cow.gender === 'Female' ? 'bg-pink-500' : 'bg-blue-500'
                  }`}>
                    {cow.gender}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold text-white ${
                    cow.health === 'Healthy' ? 'bg-green-500' :
                    cow.health === 'Sick' ? 'bg-red-500' :
                    cow.health === 'Under Treatment' ? 'bg-yellow-500' : 'bg-red-700'
                  }`}>
                    {cow.health}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {cow.breed} • {cow.age} yrs • {cow.weight} • {cow.color} • {cow.price}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(cow)}
                  className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(cow.id)}
                  className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🐄</div>
          <p className="text-gray-400 text-lg">No cattle found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? '✏️ Edit Cattle' : '➕ Add New Cattle'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Photo */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Photo</label>
                {form.photo && (
                  <img src={form.photo} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron-light file:text-saffron-dark file:font-medium hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-400 mt-1">Or enter URL:</p>
                <input
                  type="text"
                  value={form.photo}
                  onChange={e => setForm({ ...form, photo: e.target.value })}
                  placeholder="Image URL"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. ગંગા"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Tag Number *</label>
                  <input
                    type="text"
                    value={form.tagNumber}
                    onChange={e => setForm({ ...form, tagNumber: e.target.value })}
                    placeholder="e.g. NK-009"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Breed</label>
                  <select
                    value={form.breed}
                    onChange={e => setForm({ ...form, breed: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
                  >
                    <option value="ગીર">ગીર</option>
                    <option value="કાંકરેજ">કાંકરેજ</option>
                    <option value="સાહિવાલ">સાહિવાલ</option>
                    <option value="થારપારકર">થારપારકર</option>
                    <option value="રેડ સિંધી">રેડ સિંધી</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Gender</label>
                  <select
                    value={form.gender}
                    onChange={e => setForm({ ...form, gender: e.target.value as 'Female' | 'Male' })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Health Status</label>
                  <select
                    value={form.health}
                    onChange={e => setForm({ ...form, health: e.target.value as Cow['health'] })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Sick">Sick</option>
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Weight</label>
                  <input
                    type="text"
                    value={form.weight}
                    onChange={e => setForm({ ...form, weight: e.target.value })}
                    placeholder="e.g. 350 kg"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={e => setForm({ ...form, color: e.target.value })}
                    placeholder="e.g. Brown"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Price</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. ₹45,000"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Date Added</label>
                  <input
                    type="date"
                    value={form.dateAdded}
                    onChange={e => setForm({ ...form, dateAdded: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!form.name || !form.tagNumber}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                  !form.name || !form.tagNumber ? 'bg-gray-300 cursor-not-allowed' : 'gradient-saffron hover:opacity-90'
                }`}
              >
                <Save className="w-5 h-5" /> {editingId ? 'Update Cattle' : 'Add Cattle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-fadeInUp">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Cattle?</h3>
            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
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
