
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Search, Database, Mic, 
  FileCheck, ChevronLeft, ChevronRight,
  Settings, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

// Navigation items configuration
const navItems = [
  { 
    name: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '#dashboard' 
  },
  { 
    name: 'Document Search', 
    icon: Search, 
    path: '#document-search' 
  },
  { 
    name: 'Sample Generator', 
    icon: Database, 
    path: '#sample-generator' 
  },
  { 
    name: 'Meeting Assistant', 
    icon: Mic, 
    path: '#meeting-assistant' 
  },
  { 
    name: 'NFR Strategy', 
    icon: FileCheck, 
    path: '#nfr-strategy' 
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState('Dashboard');

  // Set initial active state based on URL hash when component mounts
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const matchingItem = navItems.find(item => item.path === `#${hash}`);
      if (matchingItem) {
        setActive(matchingItem.name);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    setActive(item.name);
    // Update URL hash without full page reload
    window.history.pushState(null, '', item.path);
    
    // Dispatch a hashchange event so other components can react
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <aside 
      className={cn(
        "sidebar-container h-screen flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4">
        {expanded ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
              t
            </div>
            <span className="font-semibold text-lg">tGPT</span>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
            t
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-muted text-muted-foreground"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  active === item.name 
                    ? "bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300" 
                    : "text-sidebar-foreground hover:bg-muted"
                )}
                onClick={(e) => handleNavigation(item, e)}
                aria-current={active === item.name ? "page" : undefined}
              >
                <item.icon size={20} />
                {expanded && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          {expanded && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Business Analyst</p>
              </div>
            </div>
          )}
          {!expanded && (
            <div className="w-8 h-8 mx-auto rounded-full bg-muted flex items-center justify-center">
              <User size={16} />
            </div>
          )}
          {expanded && <ThemeToggle />}
          {!expanded && (
            <div className="mx-auto pt-3">
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
