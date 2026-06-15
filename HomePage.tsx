import { useAppState } from '../store';
import { LOGO_URL, CONTACTS, ADDRESS, INSTAGRAM_URL, YOUTUBE_URL } from '../data';
import { Heart, Shield, Leaf, MapPin, Phone, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const { cows } = useAppState();
  const totalAnimals = cows.length;
  const healthyCows = cows.filter(c => c.health === 'Healthy').length;
  const femaleCows = cows.filter(c => c.gender === 'Female').length;
  const maleCows = cows.filter(c => c.gender === 'Male').length;

  return (
    <div className="animate-fadeInUp">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 animate-float" />
            <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white/15 animate-float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  🙏 ગૌ સેવા એ જ પ્રભુ સેવા
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                  શ્રી નકળંગ ગૌશાળા
                  <br />
                  <span className="text-yellow-200">ચેરીટેબલ ટ્રસ્ટ</span>
                </h1>
                <p className="text-lg md:text-xl text-orange-100 mb-4 font-medium">
                  પાંચવડા, તાલુકો જસદણ, જિલ્લો રાજકોટ
                </p>
                <p className="text-base text-orange-100/80 mb-8 max-w-lg">
                  Dedicated to the protection, care, and welfare of cows. Serving with love and devotion since generations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => setCurrentPage('cattle')}
                    className="px-8 py-3.5 bg-white text-saffron-dark font-bold rounded-xl hover:bg-orange-50 transition-all shadow-xl flex items-center gap-2 justify-center"
                  >
                    View Our Cattle <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-8 py-3.5 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                  >
                    <Phone className="w-5 h-5" /> Contact Us
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/10 backdrop-blur-sm p-3 animate-pulse-glow">
                    <img
                      src={LOGO_URL}
                      alt="Gaushala Logo"
                      className="w-full h-full rounded-full object-cover border-4 border-white/30"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white text-saffron-dark px-4 py-2 rounded-xl shadow-xl font-bold text-lg">
                    🐄 {totalAnimals}+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Animals', value: totalAnimals, icon: '🐄', color: 'from-orange-500 to-amber-500' },
            { label: 'Healthy', value: healthyCows, icon: '💚', color: 'from-green-500 to-emerald-500' },
            { label: 'Female (Cows)', value: femaleCows, icon: '♀️', color: 'from-pink-500 to-rose-500' },
            { label: 'Male (Bulls)', value: maleCows, icon: '♂️', color: 'from-blue-500 to-indigo-500' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 md:p-6 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
            About <span className="text-saffron">Our Gaushala</span>
          </h2>
          <div className="w-24 h-1 gradient-saffron rounded-full mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are committed to protecting and nurturing cows with utmost care and devotion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: 'Love & Care',
              desc: 'Every cow is treated with love, proper nutrition, and medical care. We ensure their well-being at all times.',
              color: 'text-red-500',
              bg: 'bg-red-50',
            },
            {
              icon: Shield,
              title: 'Protection',
              desc: 'We rescue abandoned and injured cattle from the streets and provide them a safe shelter and home.',
              color: 'text-blue-500',
              bg: 'bg-blue-50',
            },
            {
              icon: Leaf,
              title: 'Natural Living',
              desc: 'Our cattle enjoy open spaces, natural feed, and a stress-free environment in the heart of Gujarat.',
              color: 'text-green-500',
              bg: 'bg-green-50',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cattle */}
      <section className="bg-gradient-to-b from-saffron-light/50 to-transparent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
              Our <span className="text-saffron">Beloved Cattle</span>
            </h2>
            <div className="w-24 h-1 gradient-saffron rounded-full mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cows.slice(0, 6).map((cow, i) => (
              <div
                key={cow.id}
                className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cow.photo}
                    alt={cow.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      cow.health === 'Healthy' ? 'bg-green-500' :
                      cow.health === 'Sick' ? 'bg-red-500' :
                      cow.health === 'Under Treatment' ? 'bg-yellow-500' : 'bg-red-700'
                    }`}>
                      {cow.health}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      cow.gender === 'Female' ? 'bg-pink-500' : 'bg-blue-500'
                    }`}>
                      {cow.gender === 'Female' ? '♀ Female' : '♂ Male'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{cow.name}</h3>
                    <span className="text-saffron font-bold">{cow.price}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>🏷️ Tag: {cow.tagNumber} • Breed: {cow.breed}</p>
                    <p>📅 Age: {cow.age} years • {cow.weight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setCurrentPage('cattle')}
              className="px-8 py-3.5 gradient-saffron text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-xl flex items-center gap-2 mx-auto"
            >
              View All Cattle <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-6">
                Connect <span className="text-saffron">With Us</span>
              </h2>
              <div className="space-y-4">
                {CONTACTS.map((c, i) => (
                  <a key={i} href={`tel:${c.phone}`} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{c.name}</p>
                      <p className="text-green-700 font-medium">{c.phone}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  <InstagramIcon className="w-5 h-5" /> Instagram
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  <YoutubeIcon className="w-5 h-5" /> YouTube
                </a>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-saffron to-gold p-6 rounded-2xl text-white h-full flex flex-col justify-center">
                <MapPin className="w-10 h-10 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Address</h3>
                <div className="space-y-2 text-orange-50 text-lg">
                  <p className="font-bold text-white text-xl">{ADDRESS.name}</p>
                  <p>At. {ADDRESS.village}</p>
                  <p>Taluka: {ADDRESS.taluka}</p>
                  <p>District: {ADDRESS.district}</p>
                  <p>{ADDRESS.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
