import { useState } from 'react';
import { useAppState } from '../store';
import { Search, Filter, X } from 'lucide-react';

export default function CattlePage() {
  const { cows } = useAppState();
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [ageFilter, setAgeFilter] = useState<string>('All');
  const [healthFilter, setHealthFilter] = useState<string>('All');
  const [selectedCow, setSelectedCow] = useState<string | null>(null);

  const filtered = cows.filter(cow => {
    const matchSearch = cow.name.toLowerCase().includes(search.toLowerCase()) ||
      cow.breed.toLowerCase().includes(search.toLowerCase()) ||
      cow.tagNumber.toLowerCase().includes(search.toLowerCase());
    const matchGender = genderFilter === 'All' || cow.gender === genderFilter;
    const matchHealth = healthFilter === 'All' || cow.health === healthFilter;
    let matchAge = true;
    if (ageFilter === '0-2') matchAge = cow.age >= 0 && cow.age <= 2;
    else if (ageFilter === '3-5') matchAge = cow.age >= 3 && cow.age <= 5;
    else if (ageFilter === '6-10') matchAge = cow.age >= 6 && cow.age <= 10;
    else if (ageFilter === '10+') matchAge = cow.age > 10;
    return matchSearch && matchGender && matchAge && matchHealth;
  });

  const cow = selectedCow ? cows.find(c => c.id === selectedCow) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
          Our <span className="text-saffron">Cattle Family</span> 🐄
        </h1>
        <div className="w-24 h-1 gradient-saffron rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Browse our cattle by gender, age, and health status</p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 md:p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, breed, tag..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Gender</label>
            <select
              value={genderFilter}
              onChange={e => setGenderFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
            >
              <option value="All">All Genders</option>
              <option value="Female">♀ Female</option>
              <option value="Male">♂ Male</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Age</label>
            <select
              value={ageFilter}
              onChange={e => setAgeFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
            >
              <option value="All">All Ages</option>
              <option value="0-2">0-2 Years (Calf)</option>
              <option value="3-5">3-5 Years</option>
              <option value="6-10">6-10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Health</label>
            <select
              value={healthFilter}
              onChange={e => setHealthFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          <span>Showing {filtered.length} of {cows.length} animals</span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-400">No cattle found matching your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cow, i) => (
            <div
              key={cow.id}
              onClick={() => setSelectedCow(cow.id)}
              className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={cow.photo}
                  alt={cow.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                    cow.health === 'Healthy' ? 'bg-green-500' :
                    cow.health === 'Sick' ? 'bg-red-500' :
                    cow.health === 'Under Treatment' ? 'bg-yellow-500' : 'bg-red-700'
                  }`}>
                    {cow.health}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                    cow.gender === 'Female' ? 'bg-pink-500' : 'bg-blue-500'
                  }`}>
                    {cow.gender === 'Female' ? '♀ Female' : '♂ Male'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{cow.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">🏷️ {cow.tagNumber}</span>
                  <span className="text-saffron font-bold text-lg">{cow.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-xs">Breed</span>
                    <p className="font-semibold text-gray-700">{cow.breed}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-xs">Age</span>
                    <p className="font-semibold text-gray-700">{cow.age} Years</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {cow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCow(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInUp" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 md:h-80">
              <img src={cow.photo} alt={cow.name} className="w-full h-full object-cover rounded-t-3xl" />
              <button
                onClick={() => setSelectedCow(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-3xl font-black text-white">{cow.name}</h2>
                <p className="text-orange-200">{cow.tagNumber}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                  cow.gender === 'Female' ? 'bg-pink-500' : 'bg-blue-500'
                }`}>
                  {cow.gender === 'Female' ? '♀ Female' : '♂ Male'}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                  cow.health === 'Healthy' ? 'bg-green-500' :
                  cow.health === 'Sick' ? 'bg-red-500' :
                  cow.health === 'Under Treatment' ? 'bg-yellow-500' : 'bg-red-700'
                }`}>
                  {cow.health}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Breed', value: cow.breed },
                  { label: 'Age', value: `${cow.age} Years` },
                  { label: 'Weight', value: cow.weight },
                  { label: 'Color', value: cow.color },
                  { label: 'Price', value: cow.price },
                  { label: 'Date Added', value: cow.dateAdded },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <p className="font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              {cow.notes && (
                <div className="bg-saffron-light rounded-xl p-4">
                  <span className="text-xs text-saffron-dark font-medium">Notes</span>
                  <p className="text-gray-700 mt-1">{cow.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
