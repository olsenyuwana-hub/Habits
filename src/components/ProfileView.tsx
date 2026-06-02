import React, { useState } from 'react';
import { ShieldCheck, Heart, Zap, Globe, Cpu, Award, ZapOff, ArrowDownCircle, ArrowUpCircle, ShoppingBag, ShieldAlert, Sparkles } from 'lucide-react';
import { UserStats, District, GearItem, EquippedGear } from '../types';
import { SoundEngine } from '../utils/audio';

interface ProfileViewProps {
  stats: UserStats;
  districts: District[];
  equippedGear: EquippedGear;
  levelUp: () => void;
  levelDown: () => void;
  triggerToast: (msg: string) => void;
}

export function ProfileView({ stats, districts, equippedGear, levelUp, levelDown, triggerToast }: ProfileViewProps) {
  const [glitch, setGlitch] = useState(false);

  const triggerGlitchEffect = () => {
    SoundEngine.playClick();
    setGlitch(true);
    setTimeout(() => setGlitch(false), 400);
  };

  const handleLevelUp = () => {
    triggerGlitchEffect();
    levelUp();
  };

  const handleLevelDown = () => {
    triggerGlitchEffect();
    levelDown();
  };

  const badges = [
    {
      id: 'badge1',
      name: 'Nebula Navigator',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLui-LulX9w4afU0gsSEkfgULdwcwxknueJ_Iv9Fip2xvmQpSDN0pHYSokgzW14vKaDIiKLBgtP2L0LYSOSZ3B0hwu3JWoz5fUWeqDy-iavxJHAIHa52LpQvWz1ifbSK-PmelgWbXalqXCmlx9vnxp2fGRcie67RwapFEkLJcgr3NITtBwQyiMN8Sgr-KFKxd8DNJNrj9VaJADun5SLzuURPIAHNJB0lOrMAjVycbrV6mk5C8Tqb2yeAGfgv',
      isLegendary: false
    },
    {
      id: 'badge2',
      name: 'Iron Hull',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLv5s_rTQf8nGM-1mf-z7GzjmFRdC3HOVM7deEjGZscm7Ln51Q6nzLtlOnzFHNPZYDSCdIqSYAnEFjmLpZN9xYxGQT9iyQyU72s5Uh_bx9qDoS1uUzknl08v6e-S1oK7vlUzVjNkhcuZOoKRgXNdQLVmiUXowggfEV5I8TsQtp2q-ZScDFfuQQV7cjZywXtPAWRso0mTIG3puBJynm_NK8dSxlJUJDm6uTzlxj9vLb_6hZUZLycCsSWWdAos',
      isLegendary: false
    },
    {
      id: 'badge3',
      name: 'Warp Speed Scholar',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLtkLvdYdhDWZNvCihzm1-sR17Ma9N4PkNGVS1ESA7ObF-rmA4spaWNkxRDn86QCSZsKYP2IfTv4-ort98r4V_ofgITb4ooX46-Yk8zNwzqyG-rSTS8Hp3fI2xYFcv92vLjtwkuQxEyY8ZMQ1hrZ8XA8QPFcBRIwzj-IASppdpcf-F_PWH03Fwp5fCdHZCHquKdO-f0SPUamDTWnGjFlgxsY8DSowspEr02PNgx8T2dPjp5mC1aSM3Iu9XU',
      isLegendary: false
    },
    {
      id: 'badge4',
      name: 'Cosmic Sovereign',
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLua-oNwPe1gJIWPfyI2UPhWTN6JvL8hy8wshA5D1xyHJ9-UgSCH-TbJbO08gtPuHzxGXT2OkjfWgM5WTCL0_HKWKNX2pRyG0B4ottpC30SPloXmEnvO19Y6iJ3pSr53G8sJ34Re24uPqg1v1xrgE6eYgnALqv1FjZ9-VD7fWZWi5I80nV2LIkXV1qC7chMR9C7Dk3C1hPaq2ayPUA6It_EVJVr5ybIWWsLQeVbB_XTF7dou5GX-3iAJDsrr',
      isLegendary: true
    }
  ];

  return (
    <div className="space-y-6 pt-2 font-sans pb-4">
      {/* Profile Hero section with scanline backdrop */}
      <section className="relative overflow-hidden glass-panel rounded-xl p-6 flex flex-col items-center text-center space-y-4">
        {/* Animated holographic vertical scanning matrix */}
        <div className="scan-line absolute top-0 left-0 w-full animate-scan"></div>
        
        <div className="relative group">
          <div className="absolute inset-x-0 inset-y-0 rounded-full bg-[#00f0ff] opacity-10 blur-xl group-hover:opacity-30 transition-opacity"></div>
          
          <div 
            onClick={triggerGlitchEffect}
            className="w-28 h-28 rounded-full border-4 border-[#00dbe9] p-0.5 relative z-10 cursor-pointer transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,219,233,0.3)]"
          >
            <img 
              src={stats.avatar} 
              alt="Galactic hero glitched profile portrait" 
              className={`w-full h-full rounded-full object-cover transition-all duration-300 ${
                glitch ? 'pfp-glitch' : ''
              }`} 
            />
            
            <div className="absolute bottom-0 right-0 bg-[#00f0ff] text-[#002022] font-mono-jetbrains text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#006970]/30 select-none">
              LVL {stats.level}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-space text-xl font-bold text-[#00dbe9] tracking-tight">
            Galactic Commander
          </h2>
          <p className="font-mono-jetbrains text-[11px] text-[#ffd7f5] opacity-80" id="current-rank-display">
            Rank: {stats.rank}
          </p>
        </div>

        {/* Relative progress trace loadout bar */}
        <div className="w-full max-w-xs space-y-1.5 pt-1">
          <div className="flex justify-between font-mono-jetbrains text-[10px]">
            <span className="text-[#b9cacb] uppercase">XP PROGRESS</span>
            <span className="text-[#7df4ff] font-semibold">{stats.xp} / {stats.xpToNext} XP</span>
          </div>
          <div className="h-2.5 w-full bg-[#131c2b] rounded-full overflow-hidden border border-[#3b494b]/20">
            <div 
              className="h-full bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all duration-500" 
              style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Habits stats logs grid (4 Districts indicators) */}
      <section className="space-y-3">
        <h3 className="font-mono-jetbrains text-[11px] font-bold text-[#00f0ff]/70 flex items-center gap-1.5 tracking-wider uppercase">
          <Cpu size={14} /> The 4 Districts
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Health Card */}
          <div 
            onClick={() => SoundEngine.playClick()} 
            className="glass-panel rounded-xl p-3.5 neon-border-primary active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <Heart size={16} className="text-[#00f0ff]" />
              <span className="font-mono-jetbrains text-xs text-[#00f0ff] font-semibold">88%</span>
            </div>
            <div className="font-mono-jetbrains text-[9px] text-[#b9cacb] mb-1 uppercase leading-none font-semibold">
              Hull Integrity
            </div>
            <div className="font-space text-[15px] font-bold text-[#7df4ff]">Health</div>
          </div>

          {/* Mind Card */}
          <div 
            onClick={() => SoundEngine.playClick()} 
            className="glass-panel rounded-xl p-3.5 neon-border-secondary active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <Zap size={16} className="text-[#ffabf3]" />
              <span className="font-mono-jetbrains text-xs text-[#ffabf3] font-semibold">92%</span>
            </div>
            <div className="font-mono-jetbrains text-[9px] text-[#b9cacb] mb-1 uppercase leading-none font-semibold">
              Deflector Shields
            </div>
            <div className="font-space text-[15px] font-bold text-[#ffabf3]">Mind</div>
          </div>

          {/* School Card */}
          <div 
            onClick={() => SoundEngine.playClick()} 
            className="glass-panel rounded-xl p-3.5 neon-border-tertiary active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <Cpu size={16} className="text-[#ffd700]" />
              <span className="font-mono-jetbrains text-xs text-[#ffd700] font-semibold">65%</span>
            </div>
            <div className="font-mono-jetbrains text-[9px] text-[#b9cacb] mb-1 uppercase leading-none font-semibold">
              Navigation Data
            </div>
            <div className="font-space text-[15px] font-bold text-[#ffd700]">School</div>
          </div>

          {/* Skills Card */}
          <div 
            onClick={() => SoundEngine.playClick()} 
            className="glass-panel rounded-xl p-3.5 neon-border-primary active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <Globe size={16} className="text-[#00f0ff]" />
              <span className="font-mono-jetbrains text-xs text-[#00f0ff] font-semibold">74%</span>
            </div>
            <div className="font-mono-jetbrains text-[9px] text-[#b9cacb] mb-1 uppercase leading-none font-semibold">
              Thruster Agility
            </div>
            <div className="font-space text-[15px] font-bold text-[#7df4ff]">Skills</div>
          </div>
        </div>
      </section>

      {/* Achievement Badges horizontal scroll area */}
      <section className="space-y-3">
        <h3 className="font-mono-jetbrains text-[11px] font-bold text-[#00f0ff]/70 flex items-center gap-1.5 tracking-wider uppercase">
          <Award size={14} /> Achievement Badges
        </h3>

        <div className="flex overflow-x-auto gap-5 pb-2 no-scrollbar -mx-4 px-4 snap-x">
          {badges.map(badge => (
            <div 
              key={badge.id}
              onClick={() => SoundEngine.playClick()}
              className="w-24 shrink-0 flex flex-col items-center gap-2 snap-center cursor-pointer active:scale-95 transition-all"
            >
              <div className={`w-16 h-16 rounded-full border border-dashed flex items-center justify-center p-1.5 bg-black/30 ${
                badge.isLegendary 
                  ? 'border-[#fe00fe] shadow-[0_0_12px_rgba(254,0,254,0.3)] bg-[#fe00fe]/5' 
                  : 'border-[#00f0ff]/50 shadow-[0_0_8px_rgba(0,219,233,0.12)]'
              }`}>
                <img 
                  src={badge.image} 
                  alt={badge.name} 
                  className={`w-full h-full object-cover rounded-full ${badge.isLegendary ? 'animate-pulse' : ''}`} 
                />
              </div>
              <span className={`font-mono-jetbrains text-[8px] text-center uppercase tracking-wide leading-tight ${
                badge.isLegendary ? 'text-[#ffabf3] font-bold' : 'text-[#849495]'
              }`}>
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Equipped Gear Slots Layout */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-mono-jetbrains text-[11px] font-bold text-[#00f0ff]/70 flex items-center gap-1.5 tracking-wider uppercase">
            <ShoppingBag size={14} /> Equipped Gear
          </h3>
          <span className="font-mono-jetbrains text-[9px] text-[#ffabf3] tracking-wider">
            2 / 12 SLOTS
          </span>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden border border-[#3b494b]/20">
          <div className="grid grid-cols-2 divide-x divide-[#3b494b]/30">
            {/* HEADGEAR SLOT */}
            <div 
              onClick={() => SoundEngine.playClick()}
              className="p-3.5 flex items-center gap-3 hover:bg-[#00f0ff]/5 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00dbe9]/15 border border-[#00dbe9]/35 flex items-center justify-center shadow-[0_0_8px_rgba(0,219,233,0.15)] shrink-0">
                <Cpu size={18} className="text-[#00f0ff]" />
              </div>
              <div>
                <div className="font-mono-jetbrains text-[8px] text-[#00f0ff] uppercase tracking-wider">HEADGEAR</div>
                <div className="font-space text-xs font-bold text-[#dbfcff] truncate pr-1">
                  {equippedGear.headgear ? equippedGear.headgear.name : 'Vanguard Helmet'}
                </div>
              </div>
            </div>

            {/* BODYSUIT SLOT */}
            <div 
              onClick={() => SoundEngine.playClick()}
              className="p-3.5 flex items-center gap-3 hover:bg-[#00f0ff]/5 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#18202f] border border-[#3b494b]/30 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-[#849495]" />
              </div>
              <div>
                <div className="font-mono-jetbrains text-[8px] text-[#849495] uppercase tracking-wider text-ellipsis">BODY SUIT</div>
                <div className="font-space text-xs font-bold text-[#849495] truncate">
                  Default Cadet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Economy micro audit capsule */}
        <div 
          onClick={() => SoundEngine.playClick()}
          className="glass-panel rounded-xl p-3.5 flex items-center justify-between border border-[#ffd700]/30 cursor-pointer active:scale-[0.99] hover:bg-[#ffd700]/5 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 flex items-center justify-center text-[#ffd700]">
              <Sparkles size={14} />
            </div>
            <div>
              <div className="font-mono-jetbrains text-[8px] text-[#ffd700] uppercase font-semibold">STREAK MULTIPLIER</div>
              <div className="font-space text-xs font-bold text-[#ffe16d]">1.5x ACTIVE</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono-jetbrains text-[8px] text-[#849495]">NEXT REWARD</div>
            <div className="font-space text-[11px] font-bold text-[#e9c400]">2 Days</div>
          </div>
        </div>
      </section>

      {/* LEVEL ADJUST PANEL */}
      <section className="space-y-4 pt-1 pb-16">
        <div className="flex gap-3">
          <button 
            onClick={handleLevelDown}
            className="flex-1 h-12 bg-red-950/20 hover:bg-red-900/30 text-red-400 font-mono-jetbrains text-[10px] tracking-widest font-extrabold uppercase border-2 border-red-500/50 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowDownCircle size={16} /> Level Down
          </button>
          <button 
            onClick={handleLevelUp}
            className="flex-1 h-12 bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] font-mono-jetbrains text-[10px] tracking-widest font-extrabold uppercase border-2 border-[#00dbe9] rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,219,233,0.25)]"
          >
            <ArrowUpCircle size={16} /> Level Up
          </button>
        </div>
      </section>
    </div>
  );
}
