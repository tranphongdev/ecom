import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Tag, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  User,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { authAtom, sidebarCollapsedAtom } from '@/atoms';
import { cn } from '@/lib/utils';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/discounts', label: 'Discounts', icon: Tag },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);
  const setAuth = useSetAtom(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className={cn(
        "h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
          <Store className="text-white w-6 h-6" />
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl text-slate-800 whitespace-nowrap"
          >
            LuxeAdmin
          </motion.span>
        )}
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-50 text-indigo-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 space-y-2">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
            "text-slate-500 hover:bg-red-50 hover:text-red-600",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          )}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </motion.div>
  );
};
