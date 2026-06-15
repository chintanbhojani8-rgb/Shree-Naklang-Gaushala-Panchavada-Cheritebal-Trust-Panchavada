import { useAppState } from '../store';
import { Users, Heart, HeartPulse, DollarSign, Calendar, TrendingUp, Activity } from 'lucide-react';

interface DashboardProps {
  setCurrentPage: (page: string) => void;
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const { cows, bills, events } = useAppState();

  const totalAnimals = cows.length;
  const healthyCows = cows.filter(c => c.health === 'Healthy').length;
  const sickCows = cows.filter(c => c.health === 'Sick' || c.health === 'Critical').length;
  const underTreatment = cows.filter(c => c.health === 'Under Treatment').length;
  const femaleCows = cows.filter(c => c.gender === 'Female').length;
  const maleCows = cows.filter(c => c.gender === 'Male').length;
  const totalExpenses = bills.reduce((sum, b) => sum + b.amount, 0);

  const breedCounts: Record<string, number> = {};
  cows.forEach(c => { breedCounts[c.breed] = (breedCounts[c.breed] || 0) + 1; });

  const ageDist = {
    'Calf (0-2)': cows.filter(c => c.age <= 2).length,
    'Young (3-5)': cows.filter(c => c.age >= 3 && c.age <= 5).length,
    'Adult (6-10)': cows.filter(c => c.age >= 6 && c.age <= 10).length,
    'Senior (10+)': cows.filter(c => c.age > 10).length,
  };

  const categoryExpenses: Record<string, number> = {};
  bills.forEach(b => { categoryExpenses[b.category] = (categoryExpenses[b.category] || 0) + b.amount; });

  const statCards = [
    { label: 'Total Animals', value: totalAnimals, icon: Users, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50' },
    { label: 'Healthy', value: healthyCows, icon: Heart, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
    { label: 'Sick / Critical', value: sickCows, icon: HeartPulse, color: 'from-red-500 to-rose-500', bg: 'bg-red-50' },
    { label: 'Under Treatment', value: underTreatment, icon: Activity, color: 'from-yellow-500 to-amber-500', bg: 'bg-yellow-50' },
    { label: 'Female (Cows)', value: femaleCows, icon: Users, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50' },
    { label: 'Male (Bulls)', value: maleCows, icon: Users, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
    { label: 'Total Expenses', value: `₹${totalExpenses.toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50' },
    { label: 'Events', value: events.length, icon: Calendar, color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">
            Operator <span className="text-saffron">Dashboard</span> 📊
          </h1>
          <p className="text-gray-500 mt-1">Overview of gaushala operations</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCurrentPage('manage-cattle')} className="px-4 py-2 gradient-saffron text-white rounded-xl font-medium text-sm shadow-lg hover:opacity-90">
            + Add Cattle
          </button>
          <button onClick={() => setCurrentPage('bills')} className="px-4 py-2 gradient-forest text-white rounded-xl font-medium text-sm shadow-lg hover:opacity-90">
            + Add Bill
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: stat.color.includes('green') ? '#22c55e' : stat.color.includes('red') ? '#ef4444' : stat.color.includes('orange') ? '#f97316' : stat.color.includes('pink') ? '#ec4899' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('yellow') ? '#eab308' : stat.color.includes('purple') ? '#a855f7' : '#14b8a6' }} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl md:text-3xl font-black text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Gender Distribution */}
        <div className="glass-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gender Distribution</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#ec4899" strokeWidth="20"
                  strokeDasharray={`${(femaleCows / totalAnimals) * 251.2} 251.2`}
                />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#3b82f6" strokeWidth="20"
                  strokeDasharray={`${(maleCows / totalAnimals) * 251.2} 251.2`}
                  strokeDashoffset={`-${(femaleCows / totalAnimals) * 251.2}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-gray-800">{totalAnimals}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-500" />
                <span className="text-sm text-gray-600">Female: {femaleCows} ({Math.round(femaleCows / totalAnimals * 100)}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Male: {maleCows} ({Math.round(maleCows / totalAnimals * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Status */}
        <div className="glass-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Health Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Healthy', count: healthyCows, color: 'bg-green-500', total: totalAnimals },
              { label: 'Sick', count: sickCows, color: 'bg-red-500', total: totalAnimals },
              { label: 'Under Treatment', count: underTreatment, color: 'bg-yellow-500', total: totalAnimals },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="text-gray-800 font-bold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.total ? (item.count / item.total * 100) : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Distribution */}
        <div className="glass-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Age Distribution</h3>
          <div className="space-y-3">
            {Object.entries(ageDist).map(([label, count], i) => {
              const colors = ['bg-amber-400', 'bg-orange-500', 'bg-saffron', 'bg-red-500'];
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-24 font-medium">{label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center overflow-hidden">
                    <div
                      className={`${colors[i]} h-8 rounded-full flex items-center justify-center text-white text-xs font-bold min-w-[30px] transition-all duration-1000`}
                      style={{ width: `${totalAnimals ? (count / totalAnimals * 100) : 0}%` }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expense by Category */}
        <div className="glass-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryExpenses).map(([cat, amount], i) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-amber-500', 'bg-teal-500'];
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                    <span className="text-sm font-medium text-gray-700">{cat}</span>
                  </div>
                  <span className="font-bold text-gray-800">₹{amount.toLocaleString()}</span>
                </div>
              );
            })}
            <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
              <span className="font-bold text-gray-700">Total</span>
              <span className="font-black text-saffron text-lg">₹{totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bills */}
      <div className="glass-card rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Bills</h3>
          <button onClick={() => setCurrentPage('bills')} className="text-saffron font-medium text-sm hover:underline">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Description</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">Category</th>
                <th className="text-right py-3 px-2 text-gray-500 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.slice(-5).reverse().map(bill => (
                <tr key={bill.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 text-gray-600">{bill.date}</td>
                  <td className="py-3 px-2 font-medium text-gray-800">{bill.description}</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-1 bg-saffron-light text-saffron-dark rounded-lg text-xs font-medium">
                      {bill.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-gray-800">₹{bill.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
