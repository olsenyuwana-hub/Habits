import React from 'react';
import { LayoutGrid, Medal, ShoppingCart, User } from 'lucide-react';
import { SoundEngine } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const handleTabClick = (tab: string) => {
    SoundEngine.playClick();
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'hub', label: 'HUB', icon: LayoutGrid },
    { id: 'ranks', label: 'RANKS', icon: Medal },
    { id: 'shop', label: 'SHOP', icon: ShoppingCart },
    { id: 'command', label: 'COMMAND', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-[#18202f]/90 backdrop-blur-md rounded-t-xl border-t border-[#00f0ff]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center p-3 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-[#00f0ff]/20 text-[#7df4ff] rounded-full px-4 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#849495] hover:text-[#dbfcff]'
            }`}
          >
            <Icon size={isActive ? 22 : 20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
            <span className="font-mono-jetbrains text-[10px] mt-1 font-semibold tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
