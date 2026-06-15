import { useState } from 'react';
import { AppProvider, useAppState } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CattlePage from './components/CattlePage';
import EventsPage from './components/EventsPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ManageCattle from './components/ManageCattle';
import BillsPage from './components/BillsPage';
import ManageEvents from './components/ManageEvents';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isOperator } = useAppState();

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={navigateTo} />;
      case 'cattle':
        return <CattlePage />;
      case 'events':
        return <EventsPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setCurrentPage={navigateTo} />;
      case 'dashboard':
        return isOperator ? <Dashboard setCurrentPage={navigateTo} /> : <LoginPage setCurrentPage={navigateTo} />;
      case 'manage-cattle':
        return isOperator ? <ManageCattle /> : <LoginPage setCurrentPage={navigateTo} />;
      case 'bills':
        return isOperator ? <BillsPage /> : <LoginPage setCurrentPage={navigateTo} />;
      case 'manage-events':
        return isOperator ? <ManageEvents /> : <LoginPage setCurrentPage={navigateTo} />;
      default:
        return <HomePage setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg">
      <Header currentPage={currentPage} setCurrentPage={navigateTo} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
