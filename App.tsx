import React, { useState, useEffect, createContext, useContext } from 'react';
import { Skoring } from './components/Skoring';
import { SkoringResult } from './components/SkoringResult';
import { RegularModules } from './components/RegularModules';
import { ThematicModules } from './components/ThematicModules';
// Import VeoVideoGen dihapus
// Import Dashboard dihapus (karena didefinisikan di file yang sama sebelumnya, sekarang dihapus total)
import { 
  CheckSquare, 
  Book, 
  Layers, 
  Menu, 
  X 
} from 'lucide-react';

// --- Router Context ---
// Dashboard dan Veo Studio dihapus dari tipe Route
type Route = 'modul-reguler' | 'modul-tematik' | 'skoring' | 'skoring-result';

interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextType>({ currentRoute: 'modul-reguler', navigate: () => {} });
export const useNavigate = () => useContext(RouterContext);

const App: React.FC = () => {
  // Default route diubah ke 'modul-reguler' karena dashboard dihapus
  const [currentRoute, setCurrentRoute] = useState<Route>('modul-reguler');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      // Validasi sederhana agar hash yang tidak valid tidak merusak app
      if (hash && ['modul-reguler', 'modul-tematik', 'skoring', 'skoring-result'].includes(hash)) {
        setCurrentRoute(hash as Route);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: Route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Nav Items diperbarui: Hapus Dashboard & Veo
  const navItems = [
    { id: 'modul-reguler', label: 'Modul Reguler', icon: Book },
    // { id: 'modul-tematik', label: 'Modul Tematik', icon: Layers },
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
      <div className="min-h-screen bg-[#F5FAFF] flex flex-col font-sans text-[#0857C3] selection:bg-[#307FE2] selection:text-white">
        
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 transition-all duration-300">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              
              {/* Logo - Klik mengarah ke Modul Reguler (Home baru) */}
              <div className="flex items-center cursor-pointer gap-2 group" onClick={() => navigate('modul-reguler')}>
                <div className="flex items-baseline tracking-tight select-none">
                  <span className="text-3xl font-extrabold text-[#0857C3] tracking-tighter">link</span>
                  <span className="text-3xl font-extrabold text-[#307FE2] tracking-tighter">umkm</span>
                </div>
                <span className="ml-2 px-2 py-0.5 rounded-md bg-[#F5FAFF] group-hover:bg-[#71C5E8]/20 transition-colors text-[10px] font-bold text-[#0857C3]/70 group-hover:text-[#0857C3] uppercase tracking-widest border border-[#71C5E8]/30">
                  Smart
                </span>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as Route)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center transition-all duration-200
                      ${currentRoute === item.id 
                        ? 'text-[#0857C3] bg-white shadow-sm ring-1 ring-[#0857C3]/5' 
                        : 'text-[#0857C3]/60 hover:text-[#0857C3] hover:bg-white/60'}
                    `}
                  >
                    <item.icon className={`w-4 h-4 mr-2.5 transition-colors ${currentRoute === item.id ? 'text-[#307FE2]' : 'text-[#71C5E8] group-hover:text-[#307FE2]'}`} />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl text-[#0857C3] hover:bg-[#F5FAFF] transition-colors">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#71C5E8]/30 bg-white shadow-xl animate-in slide-in-from-top-2">
              <div className="px-4 pt-3 pb-4 space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as Route)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-colors
                      ${currentRoute === item.id 
                        ? 'text-[#0857C3] bg-[#F5FAFF]' 
                        : 'text-[#0857C3]/70 hover:text-[#0857C3] hover:bg-[#F5FAFF]'}
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-5 h-5 mr-3 ${currentRoute === item.id ? 'text-[#307FE2]' : 'text-[#71C5E8]'}`} />
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
        <footer className="bg-white border-t border-[#71C5E8]/20 py-12 mt-auto">
           <div className="max-w-[1400px] mx-auto px-4 text-center">
             {/* <div className="flex justify-center items-center gap-1 mb-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                 <span className="text-2xl font-extrabold text-[#0857C3] tracking-tight">link</span>
                 <span className="text-2xl font-extrabold text-[#307FE2] tracking-tight">umkm</span>
             </div>
             <p className="text-[#0857C3]/50 text-sm font-medium">&copy; 2025 LinkUMKM. All rights reserved.</p> */}
           </div>
        </footer>
      </div>
    </RouterContext.Provider>
  );
};

export default App;