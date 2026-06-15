import { CONTACTS, ADDRESS, INSTAGRAM_URL, YOUTUBE_URL } from '../data';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './Icons';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
          Get In <span className="text-saffron">Touch</span> 📞
        </h1>
        <div className="w-24 h-1 gradient-saffron rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-lg">We'd love to hear from you. Reach out anytime!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Phone className="w-6 h-6 text-saffron" /> Contact Persons
          </h2>
          {CONTACTS.map((contact, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 gradient-saffron rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{contact.name}</h3>
                  <p className="text-saffron font-semibold text-lg">{contact.phone}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={`https://wa.me/91${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Address & Social */}
        <div className="space-y-6">
          {/* Address */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
            <div className="gradient-saffron p-6 text-white">
              <MapPin className="w-8 h-8 mb-3" />
              <h2 className="text-2xl font-bold">Our Location</h2>
            </div>
            <div className="p-6 space-y-3 text-gray-700 text-lg">
              <p className="font-bold text-xl text-gray-800">{ADDRESS.name}</p>
              <p>📍 At. {ADDRESS.village}</p>
              <p>🏛️ Taluka: {ADDRESS.taluka}</p>
              <p>📌 District: {ADDRESS.district}</p>
              <p>🇮🇳 {ADDRESS.state}</p>
            </div>
          </div>

          {/* Social */}
          <div className="glass-card rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2>
            <div className="space-y-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <InstagramIcon className="w-6 h-6" />
                <div>
                  <p className="font-bold">Instagram</p>
                  <p className="text-sm text-purple-100">@shree_naklank_gaushala</p>
                </div>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-red-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <YoutubeIcon className="w-6 h-6" />
                <div>
                  <p className="font-bold">YouTube</p>
                  <p className="text-sm text-red-100">@naklanggaushalapanchavada</p>
                </div>
              </a>
            </div>
          </div>

          {/* Timing */}
          <div className="glass-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-saffron" />
              <h2 className="text-xl font-bold text-gray-800">Visiting Hours</h2>
            </div>
            <div className="bg-saffron-light rounded-xl p-4 text-center">
              <p className="text-saffron-dark font-bold text-lg">🕕 Morning: 6:00 AM - 11:00 AM</p>
              <p className="text-saffron-dark font-bold text-lg mt-2">🕓 Evening: 4:00 PM - 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation CTA */}
      <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl text-center bg-gradient-to-r from-saffron-light to-gold-light">
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-gray-800 mb-4">Support Our Gaushala</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg">
          Your generous donations help us provide food, shelter, and medical care to our beloved cattle. Every contribution makes a difference!
        </p>
        <p className="text-2xl font-bold text-saffron">🙏 ગૌ સેવા એ જ પ્રભુ સેવા 🙏</p>
      </div>
    </div>
  );
}
