import { LOGO_URL, INSTAGRAM_URL, YOUTUBE_URL, CONTACTS, ADDRESS } from '../data';
import { Phone, MapPin, Heart } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Logo" className="w-14 h-14 rounded-full border-2 border-saffron object-cover" />
              <div>
                <h3 className="font-bold text-lg text-saffron">શ્રી નકળંગ ગૌશાળા</h3>
                <p className="text-gray-400 text-sm">ચેરીટેબલ ટ્રસ્ટ, પાંચવડા</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Dedicated to the protection and welfare of cows with love, care, and devotion.
            </p>
            <div className="flex gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-saffron" /> Contact Us
            </h3>
            <div className="space-y-3">
              {CONTACTS.map((c, i) => (
                <a key={i} href={`tel:${c.phone}`} className="block text-gray-400 hover:text-saffron transition-colors">
                  <span className="font-medium text-gray-300">{c.name}</span>
                  <br />
                  📞 {c.phone}
                </a>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-saffron" /> Address
            </h3>
            <div className="text-gray-400 space-y-1">
              <p className="text-gray-300 font-medium">{ADDRESS.name}</p>
              <p>At. {ADDRESS.village}</p>
              <p>Taluka: {ADDRESS.taluka}</p>
              <p>District: {ADDRESS.district}</p>
              <p>{ADDRESS.state}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for ગૌ સેવા
          </p>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} શ્રી નકળંગ ગૌશાળા ચેરીટેબલ ટ્રસ્ટ, પાંચવડા. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
