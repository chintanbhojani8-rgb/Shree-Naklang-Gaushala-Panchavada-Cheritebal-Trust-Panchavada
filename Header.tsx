import { useState } from 'react';
import { LOGO_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../data';
import { useAppState } from '../store';
import { Menu, X, LogIn, LogOut, Home, Users, Calendar, Phone, LayoutDashboard, FileText, Settings } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const { isOperator, setIsOperator } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);

  const publicNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cattle', label: 'Our Cattle', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const operatorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage-cattle', label: 'Manage Cattle', icon: Settings },
    { id: 'bills', label: 'Bills', icon: FileText },
    { id: 'manage-events', label: 'Manage Events', icon: Calendar },
  ];

  const navItems = isOperator ? [...publicNav, ...operatorNav] : publicNav;

  return (
    <header className="sticky top-0 z-50 glass-card shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img
              src={LOGO_URL}
              alt="Gaushala Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-saffron shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-base font-bold text-saffron-dark leading-tight">
                શ્રી નકળંગ ગૌશાળા
              </h1>
              <p className="text-[10px] md:text-xs text-forest font-medium">ચેરીટેબલ ટ્રસ્ટ, પાંચવડા</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'gradient-saffron text-white shadow-md'
                    : 'text-gray-700 hover:bg-saffron-light hover:text-saffron-dark'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-pink-50 transition-colors">
              <InstagramIcon className="w-5 h-5 text-pink-600" />
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-red-50 transition-colors">
              <YoutubeIcon className="w-5 h-5 text-red-600" />
            </a>

            {isOperator ? (
              <button
                onClick={() => { setIsOperator(false); setCurrentPage('home'); }}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 gradient-saffron text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
              >
                <LogIn className="w-4 h-4" /> Operator
              </button>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-4 animate-fadeInUp">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); setMenuOpen(false); }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'gradient-saffron text-white'
                      : 'text-gray-700 hover:bg-saffron-light'
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
              {isOperator ? (
                <button
                  onClick={() => { setIsOperator(false); setCurrentPage('home'); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => { setCurrentPage('login'); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-4 py-3 text-saffron text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" /> Operator Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
