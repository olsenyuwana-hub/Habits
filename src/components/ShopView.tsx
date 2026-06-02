import React from 'react';
import { ShoppingCart, Compass, Coins, Sparkles, Plus, AlertCircle, Check } from 'lucide-react';
import { GearItem, UserStats } from '../types';
import { SoundEngine } from '../utils/audio';

interface ShopViewProps {
  stats: UserStats;
  shopItems: GearItem[];
  buyItem: (item: GearItem) => void;
  triggerToast: (msg: string) => void;
}

export function ShopView({ stats, shopItems, buyItem, triggerToast }: ShopViewProps) {
  // Filter items by category
  const featured = shopItems.find(item => item.id === 'featured_upgrade');
  const shipUpgrades = shopItems.filter(item => item.category === 'ship' && item.id !== 'featured_upgrade');
  const defenses = shopItems.filter(item => item.category === 'defense');
  const avatarGear = shopItems.filter(item => item.category === 'avatar');

  const handlePurchase = (item: GearItem) => {
    if (item.purchased) {
      SoundEngine.playClick();
      triggerToast(`${item.name} IS ALREADY UNLOCKED.`);
      return;
    }

    if (stats.credits >= item.price) {
      buyItem(item);
    } else {
      SoundEngine.playWarning();
      triggerToast(`INSUFFICIENT CREDITS! NEED ${item.price} CR.`);
    }
  };

  const renderItemButton = (item: GearItem) => {
    if (item.purchased) {
      return (
        <button 
          className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded font-mono-jetbrains text-[10px] flex items-center gap-1 select-none font-bold"
          disabled
        >
          <Check size={10} className="stroke-[3px]" /> UNLOCKED
        </button>
      );
    }

    return (
      <button 
        onClick={() => handlePurchase(item)}
        className="bg-[#00f0ff] hover:bg-[#7df4ff] hover:text-[#002022] text-[#00363a] px-3 py-1.5 rounded font-mono-jetbrains text-[10px] font-bold active:scale-95 transition-all"
      >
        PURCHASE
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Featured Upgrade Section */}
      {featured && (
        <section className="mt-3">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#18202f] border border-[#3b494b]/20 group">
            <img 
              src={featured.image} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" 
              alt="Holographic spaceship trail nebula featured upgrade" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1323] via-[#0b1323]/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <div className="flex justify-between items-end">
                <div className="max-w-[70%]">
                  <span className="font-mono-jetbrains text-[10px] text-[#ffd700] uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Sparkles size={10} /> Featured Upgrade
                  </span>
                  <h2 className="font-space text-lg font-bold text-white drop-shadow-md">
                    {featured.name}
                  </h2>
                  <p className="text-[#b9cacb] text-xs leading-snug mt-1">
                    Leave a cosmic signature in your wake with this legendary effect.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono-jetbrains text-[9px] text-[#ffd700] tracking-widest font-bold">
                    {featured.rarity}
                  </span>
                  {featured.purchased ? (
                    <button className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg font-mono-jetbrains text-xs font-bold shrink-0 cursor-not-allowed">
                      UNLOCKED
                    </button>
                  ) : (
                    <button 
                      onClick={() => handlePurchase(featured)}
                      className="bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] px-4 py-2 rounded-lg font-mono-jetbrains text-xs font-bold purchase-glow active:scale-95 transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)] shrink-0"
                    >
                      {featured.price.toLocaleString()} CR
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ship Upgrades Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-space font-semibold text-[#dbfcff] text-base">Ship Upgrades</h3>
          <span className="font-mono-jetbrains text-[10px] text-[#849495] tracking-wide uppercase hover:text-[#00f0ff] cursor-pointer" onClick={() => SoundEngine.playClick()}>
            View All
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {shipUpgrades.map(item => (
            <div 
              key={item.id}
              className="glass-panel p-3.5 rounded-xl flex gap-4 items-center neon-border-primary active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => SoundEngine.playClick()}
            >
              <div className="w-16 h-16 bg-[#131c2b] rounded-lg overflow-hidden border border-[#3b494b]/30 shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between h-16">
                <div>
                  <h4 className="font-space text-sm font-semibold text-[#dbfcff] leading-none mb-1">
                    {item.name}
                  </h4>
                  <span className="font-mono-jetbrains text-[9px] text-[#00dbe9] tracking-wider font-bold">
                    {item.rarity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono-jetbrains text-xs text-[#b9cacb] font-medium">
                    {item.price} CR
                  </span>
                  {renderItemButton(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Defenses Grid Category section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-space font-semibold text-[#ffabf3] text-base">Defenses</h3>
          <span className="font-mono-jetbrains text-[10px] text-[#849495] tracking-wide uppercase hover:text-[#ffabf3] cursor-pointer" onClick={() => SoundEngine.playClick()}>
            View All
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {defenses.map(item => (
            <div 
              key={item.id}
              className="glass-panel p-3 rounded-xl flex flex-col gap-3 items-start neon-border-secondary active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => SoundEngine.playClick()}
            >
              <div className="w-full aspect-square bg-[#131c2b] rounded-lg overflow-hidden border border-[#3b494b]/30">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div>
                <h4 className="font-space text-xs font-semibold text-[#dbfcff] leading-tight">
                  {item.name}
                </h4>
                <span className="font-mono-jetbrains text-[8px] text-[#ffabf3] font-bold">
                  {item.rarity}
                </span>
              </div>
              <div className="w-full flex justify-between items-center mt-auto pt-2 border-t border-[#3b494b]/10">
                <span className="font-mono-jetbrains text-[11px] text-[#b9cacb]">
                  {item.price} CR
                </span>
                
                {item.purchased ? (
                  <span className="w-8 h-8 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 select-none">
                    <Check size={12} className="stroke-[3px]" />
                  </span>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(item);
                    }}
                    className="bg-[#2d3546] hover:bg-[#fe00fe] hover:text-white text-[#ffabf3] border border-[#fe00fe]/30 w-8 h-8 rounded flex items-center justify-center active:scale-95 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar Gear category section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-space font-semibold text-[#ffd700] text-base">Avatar Gear</h3>
          <span className="font-mono-jetbrains text-[10px] text-[#849495] tracking-wide uppercase hover:text-[#ffd700] cursor-pointer" onClick={() => SoundEngine.playClick()}>
            View All
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {avatarGear.map(item => (
            <div 
              key={item.id}
              className="glass-panel p-3 rounded-xl flex gap-4 items-center neon-border-tertiary active:scale-[0.99] transition-transform cursor-pointer font-space"
              onClick={() => SoundEngine.playClick()}
            >
              <div className="w-16 h-16 bg-[#131c2b] rounded-lg overflow-hidden border border-[#3b494b]/30 shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between h-16 animate-pulse-frequent">
                <div>
                  <h4 className="font-space text-sm font-semibold text-[#dbfcff] leading-none mb-1">
                    {item.name}
                  </h4>
                  <span className="font-mono-jetbrains text-[9px] text-[#ffd7ff] tracking-wider font-bold">
                    {item.rarity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono-jetbrains text-xs text-[#b9cacb] font-medium">
                    {item.price} CR
                  </span>
                  {renderItemButton(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
