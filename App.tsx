import React, { useState, useEffect, createContext, useContext } from 'react';
import { Skoring } from './components/Skoring';
import { SkoringResult } from './components/SkoringResult';
import { RegularModules } from './components/RegularModules';
import { ThematicModules } from './components/ThematicModules';
import { Analytics } from '@vercel/analytics/react';
import { 
  CheckSquare, 
  Book, 
  Menu, 
  X 
} from 'lucide-react';

type Route = 'modul-reguler' | 'modul-tematik' | 'skoring' | 'skoring-result';

interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextType>({ currentRoute: 'modul-reguler', navigate: () => {} });
export const useNavigate = () => useContext(RouterContext);

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('modul-reguler');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['modul-reguler', 'modul-tematik', 'skoring', 'skoring-result'].includes(hash)) {
        setCurrentRoute(hash as Route);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: Route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'modul-reguler', label: 'Modul Reguler', icon: Book },
    { id: 'skoring', label: 'Skoring', icon: CheckSquare },
  ];

  const renderContent = () => {
    switch (currentRoute) {
      case 'modul-reguler':
        return <RegularModules />;
      case 'modul-tematik':
        return <ThematicModules />;
      case 'skoring':
        return <Skoring onComplete={() => navigate('skoring-result')} />;
      case 'skoring-result':
        return <SkoringResult />;
      default:
        return <RegularModules />;
    }
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      <Analytics />
      {/* Background Page: Slate Abu Gelap (#F1F5F9) sesuai request */}
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-[#0857C3] selection:bg-[#F97316] selection:text-white">
        
        {/* Navbar: White solid dengan shadow halus agar terpisah dari BG abu */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              
              {/* Logo */}
              <div className="flex items-center cursor-pointer gap-2 group" onClick={() => navigate('modul-reguler')}>
                 <img 
                    src="/images/logo.png" 
                    alt="LinkUMKM" 
                    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-[#0857C3] tracking-tighter">link<span class="text-[#F97316]">umkm</span></span>';
                    }}
                 />
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as Route)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center transition-all duration-300
                      ${currentRoute === item.id 
                        ? 'text-white bg-[#0857C3] shadow-md shadow-blue-900/10' 
                        : 'text-slate-500 hover:text-[#0857C3] hover:bg-slate-100'}
                    `}
                  >
                    <item.icon className={`w-4 h-4 mr-2.5 ${currentRoute === item.id ? 'text-white' : 'text-slate-400 group-hover:text-[#0857C3]'}`} />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2">
              <div className="px-4 pt-3 pb-4 space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as Route)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-colors
                      ${currentRoute === item.id 
                        ? 'text-[#0857C3] bg-[#F0F9FF]' 
                        : 'text-slate-600 hover:text-[#0857C3] hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-5 h-5 mr-3 ${currentRoute === item.id ? 'text-[#307FE2]' : 'text-slate-400'}`} />
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
           {renderContent()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
           <div className="max-w-[1400px] mx-auto px-4 text-center">
           </div>
        </footer>
      </div>
    </RouterContext.Provider>
  );
};

export default App;