import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useAtom, useAtomValue } from 'jotai';
import { searchQueryAtom, profileAtom } from '@/atoms';

export const Topbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const profile = useAtomValue(profileAtom);
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search products, orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 group outline-none"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{profile.name}</p>
            <p className="text-xs text-slate-500">{profile.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white overflow-hidden group-hover:border-indigo-100 transition-colors">
            <img 
              src={profile.avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
