import { useState } from 'react';
import { useAppState } from '../store';
import { EventItem } from '../types';
import { Plus, Trash2, X, Save, Edit, Image as ImageIcon, Video } from 'lucide-react';

const emptyEvent: Omit<EventItem, 'id'> = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  photos: [],
  videoUrl: '',
};

export default function ManageEvents() {
  const { events, addEvent, deleteEvent, updateEvent } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [photoUrl, setPhotoUrl] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyEvent);
    setShowForm(true);
  };

  const openEdit = (event: EventItem) => {
    setEditingId(event.id);
    setForm(event);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    if (editingId) {
      updateEvent({ ...form, id: editingId });
    } else {
      addEvent({ ...form, id: Date.now().toString() });
    }
    setShowForm(false);
    setForm(emptyEvent);
    setEditingId(null);
  };

  const addPhotoUrl = () => {
    if (photoUrl.trim()) {
      setForm({ ...form, photos: [...form.photos, photoUrl.trim()] });
      setPhotoUrl('');
    }
  };

  const addPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photos: [...prev.photos, reader.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setForm({ ...form, photos: form.photos.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            Manage <span className="text-saffron">Events</span> 🎉
          </h1>
          <p className="text-gray-500 mt-1">Add events with photos and videos for public</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 gradient-saffron text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Add New Event
        </button>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-gray-400 text-lg">No events yet. Add your first event!</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row">
                {event.photos.length > 0 && (
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={event.photos[0]}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-saffron font-medium mb-1">{event.date}</p>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-4 h-4" /> {event.photos.length} Photos
                        </span>
                        {event.videoUrl && (
                          <span className="flex items-center gap-1 text-red-500">
                            <Video className="w-4 h-4" /> Video Added
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(event)}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(event.id)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? '✏️ Edit Event' : '➕ Add New Event'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. ગૌ પૂજા મહોત્સવ"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>
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
                <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the event..."
                  rows={4}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none resize-none"
                />
              </div>

              {/* Photos */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" /> Photos
                </label>
                {form.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {form.photos.map((photo, i) => (
                      <div key={i} className="relative group">
                        <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    placeholder="Photo URL"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none text-sm"
                  />
                  <button
                    onClick={addPhotoUrl}
                    className="px-4 py-2 bg-saffron-light text-saffron-dark rounded-xl font-medium text-sm hover:bg-orange-100"
                  >
                    Add URL
                  </button>
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={addPhotoFile}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron-light file:text-saffron-dark file:font-medium hover:file:bg-orange-100"
                  />
                </div>
              </div>

              {/* Video */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  <Video className="w-4 h-4 inline mr-1" /> Video URL (YouTube)
                </label>
                <input
                  type="text"
                  value={form.videoUrl}
                  onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!form.title}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                  !form.title ? 'bg-gray-300 cursor-not-allowed' : 'gradient-saffron hover:opacity-90'
                }`}
              >
                <Save className="w-5 h-5" /> {editingId ? 'Update Event' : 'Add Event'}
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Event?</h3>
            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => { deleteEvent(deleteConfirm); setDeleteConfirm(null); }} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
