import React, { useState, useEffect } from 'react';
import { Sparkles, Coins, HelpCircle } from 'lucide-react';
import { UserStats, GearItem, EquippedGear } from './types';
import { Navbar } from './components/Navbar';
import { HubView } from './components/HubView';
import { MissionsView } from './components/MissionsView';
import { ShopView } from './components/ShopView';
import { ProfileView } from './components/ProfileView';
import { SoundEngine } from './utils/audio';
import { 
  INITIAL_DISTRICTS, 
  INITIAL_MISSIONS, 
  INITIAL_SHOP_ITEMS, 
  getRankInfo,
  RANK_PORTRAITS 
} from './utils/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Game state
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 125,
    xpToNext: 500,
    credits: 1250,
    rank: 'The Cadet',
    avatar: RANK_PORTRAITS.cadet,
    streakMultiplier: 1.5
  });

  const [districts, setDistricts] = useState(INITIAL_DISTRICTS);
  const [shopItems, setShopItems] = useState<GearItem[]>(INITIAL_SHOP_ITEMS);
  const [equippedGear, setEquippedGear] = useState<EquippedGear>({
    headgear: null,
    bodysuit: null
  });

  // Sound Context trigger warmup upon first touch
  useEffect(() => {
    const warmupContext = () => {
      SoundEngine.playClick();
      window.removeEventListener('touchstart', warmupContext);
      window.removeEventListener('click', warmupContext);
    };
    window.addEventListener('touchstart', warmupContext);
    window.addEventListener('click', warmupContext);
    return () => {
      window.removeEventListener('touchstart', warmupContext);
      window.removeEventListener('click', warmupContext);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      let nextXP = prev.xp + amount;
      let nextLevel = prev.level;
      let nextXPToNext = prev.xpToNext;

      while (nextXP >= nextXPToNext) {
        nextXP -= nextXPToNext;
        nextLevel += 1;
        nextXPToNext = 500; // standard constant step multiplier
      }

      const rankInfo = getRankInfo(nextLevel);
      const newAvatar = RANK_PORTRAITS[rankInfo.key];

      return {
        ...prev,
        xp: nextXP,
        level: nextLevel,
        xpToNext: nextXPToNext,
        rank: rankInfo.name,
        avatar: newAvatar
      };
    });
  };

  const addCredits = (amount: number) => {
    setStats(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  const subtractCredits = (amount: number) => {
    setStats(prev => ({
      ...prev,
      credits: Math.max(0, prev.credits - amount)
    }));
  };

  const buyItem = (item: GearItem) => {
    setStats(prev => ({
      ...prev,
      credits: prev.credits - item.price
    }));

    setShopItems(prev => prev.map(si => {
      if (si.id === item.id) {
        return { ...si, purchased: true };
      }
      return si;
    }));

    SoundEngine.playSuccess();
    triggerToast(`TRANSACTION COMPLETE: ${item.name.toUpperCase()}`);

    // Automatically equip bought item details instantly in slots
    if (item.category === 'avatar') {
      setEquippedGear(prev => ({ ...prev, headgear: item }));
    } else if (item.category === 'defense') {
      setEquippedGear(prev => ({ ...prev, bodysuit: item }));
    }
  };

  const handleLevelUp = () => {
    setStats(prev => {
      const nextLevel = Math.min(100, prev.level + 5);
      const rankInfo = getRankInfo(nextLevel);
      const newAvatar = RANK_PORTRAITS[rankInfo.key];
      
      setTimeout(() => {
        triggerToast(`LEVEL UP: ${rankInfo.name.toUpperCase()} (LVL ${nextLevel})`);
      }, 50);

      return {
        ...prev,
        level: nextLevel,
        rank: rankInfo.name,
        avatar: newAvatar
      };
    });
  };

  const handleLevelDown = () => {
    setStats(prev => {
      const nextLevel = Math.max(1, prev.level - 5);
      const rankInfo = getRankInfo(nextLevel);
      const newAvatar = RANK_PORTRAITS[rankInfo.key];

      setTimeout(() => {
        triggerToast(`LEVEL DOWN: ${rankInfo.name.toUpperCase()} (LVL ${nextLevel})`);
      }, 50);

      return {
        ...prev,
        level: nextLevel,
        rank: rankInfo.name,
        avatar: newAvatar
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1323] relative text-[#dbe2f8]">
      {/* Background HUD decorations */}
      <div className="fixed inset-0 z-0 hud-scanline opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(11,19,35,0.75)_100%)] pointer-events-none"></div>

      {/* Primary centered mobile column boundaries */}
      <div className="max-w-[480px] mx-auto bg-[#0b1323] min-h-screen border-x border-[#3b494b]/20 relative shadow-2xl flex flex-col">
        
        {/* Top Fixed Header with dynamic balance widgets */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 flex justify-between items-center px-6 h-14 bg-[#0b1323]/80 backdrop-blur-xl border-b border-[#3b494b]/30 shadow-[0_0_15px_rgba(0,219,233,0.1)]">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('command');
              }}
              className="w-8 h-8 rounded-full border border-[#00f0ff]/50 overflow-hidden bg-[#222a3a] relative cursor-pointer active:scale-95 transition-transform shrink-0"
            >
              <img 
                alt="Galactic character top helmet icon" 
                className="w-full h-full object-cover" 
                src={stats.avatar} 
              />
            </div>
            <h1 className="font-space font-bold text-[#00dbe9] tracking-tight text-[19px] leading-tight select-none">
              Kingdom of Mastery
            </h1>
          </div>

          <div 
            onClick={() => SoundEngine.playClick()}
            className="flex items-center gap-1.5 bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/20 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="font-mono-jetbrains text-[10px] text-[#ffd700] uppercase font-bold flex items-center gap-1">
              <Coins size={12} className="text-[#ffd700]" />
              {stats.credits.toLocaleString()} CR
            </span>
          </div>
        </header>

        {/* Scrollable Dashboard viewport panel */}
        <main className="flex-1 mt-14 mb-24 p-6 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar relative z-10">
          {activeTab === 'hub' && (
            <HubView 
              stats={stats} 
              addXP={addXP} 
              districts={districts}
              toastMessage={toastMessage}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'ranks' && (
            <MissionsView 
              stats={stats}
              missions={INITIAL_MISSIONS} 
              addXP={addXP}
              addCredits={addCredits}
              subtractCredits={subtractCredits}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'shop' && (
            <ShopView 
              stats={stats}
              shopItems={shopItems}
              buyItem={buyItem}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'command' && (
            <ProfileView 
              stats={stats}
              districts={districts}
              equippedGear={equippedGear}
              levelUp={handleLevelUp}
              levelDown={handleLevelDown}
              triggerToast={triggerToast}
            />
          )}
        </main>

        {/* Tactical dynamic bottom HUD bar tabs */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Decorative side ambient glows for wide desktop screens */}
      <div className="fixed top-1/2 left-0 w-32 h-64 bg-[#00f0ff]/5 blur-[100px] pointer-events-none hidden md:block"></div>
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-[#fe00fe]/5 blur-[100px] pointer-events-none hidden md:block"></div>
    </div>
  );
}
