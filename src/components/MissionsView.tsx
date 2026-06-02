import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Play, Clock, CheckCircle, HelpCircle, AlertTriangle, ShieldCheck, Database, Award, Info } from 'lucide-react';
import { Mission, UserStats } from '../types';
import { SoundEngine } from '../utils/audio';

interface MissionsViewProps {
  stats: UserStats;
  missions: Mission[];
  addXP: (amount: number) => void;
  addCredits: (amount: number) => void;
  subtractCredits: (amount: number) => void;
  triggerToast: (msg: string) => void;
}

interface MissionActiveState {
  missionId: number;
  state: 'INITIAL' | 'COUNTDOWN' | 'ACTIVE' | 'SUCCESS';
  countdown: number;
  elapsedSeconds: number;
}

export function MissionsView({ stats, missions, addXP, addCredits, subtractCredits, triggerToast }: MissionsViewProps) {
  // Store dynamic state for missions being played
  const [activeMissions, setActiveMissions] = useState<Record<number, MissionActiveState>>({});
  const intervalsRef = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    // Cleanup active stopwatch intervals on unmount
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  const handleStartMission = (missionId: number) => {
    SoundEngine.playAction();
    setActiveMissions(prev => ({
      ...prev,
      [missionId]: {
        missionId,
        state: 'COUNTDOWN',
        countdown: 3,
        elapsedSeconds: 0
      }
    }));

    // Start countdown timer ticking down
    const interval = setInterval(() => {
      setActiveMissions(prev => {
        const current = prev[missionId];
        if (!current) {
          clearInterval(interval);
          return prev;
        }

        if (current.countdown > 1) {
          SoundEngine.playCountdown();
          return {
            ...prev,
            [missionId]: {
              ...current,
              countdown: current.countdown - 1
            }
          };
        } else {
          // Trigger Active Stopwatch Mode
          clearInterval(interval);
          SoundEngine.playSuccess();
          triggerToast('MISSION COMMENCED! OBJECTIVES ACTIVE');
          startStopwatch(missionId);
          return {
            ...prev,
            [missionId]: {
              ...current,
              state: 'ACTIVE',
              countdown: 0
            }
          };
        }
      });
    }, 1000);
  };

  const startStopwatch = (missionId: number) => {
    const stopwatch = setInterval(() => {
      setActiveMissions(prev => {
        const current = prev[missionId];
        if (!current || current.state !== 'ACTIVE') {
          clearInterval(stopwatch);
          return prev;
        }

        return {
          ...prev,
          [missionId]: {
            ...current,
            elapsedSeconds: current.elapsedSeconds + 1
          }
        };
      });
    }, 1000);

    intervalsRef.current[missionId] = stopwatch;
  };

  const handleFinishMission = (missionId: number, xpReward: number, crReward: number) => {
    if (intervalsRef.current[missionId]) {
      clearInterval(intervalsRef.current[missionId]);
    }

    SoundEngine.playSuccess();
    addXP(xpReward);
    addCredits(crReward);
    triggerToast(`SUCCESS! +${xpReward} XP & +${crReward} CR SECURED`);

    setActiveMissions(prev => ({
      ...prev,
      [missionId]: {
        ...prev[missionId],
        state: 'SUCCESS'
      }
    }));

    setTimeout(() => {
      setActiveMissions(prev => {
        const updated = { ...prev };
        delete updated[missionId];
        return updated;
      });
    }, 2500);
  };

  const handleAbortMission = (missionId: number, difficulty: string) => {
    if (intervalsRef.current[missionId]) {
      clearInterval(intervalsRef.current[missionId]);
    }

    SoundEngine.playWarning();
    const penalty = difficulty === 'HARD' ? 50 : difficulty === 'MEDIUM' ? 25 : 10;
    subtractCredits(penalty);
    triggerToast(`MISSION ABORTED! CONTRAVENTION PENALTY: -${penalty} CR`);

    setActiveMissions(prev => {
      const updated = { ...prev };
      delete updated[missionId];
      return updated;
    });
  };

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Active Missions Header Section */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-space text-2xl font-bold text-[#dbfcff]">
            Active Missions
          </h2>
          <span className="font-mono-jetbrains text-xs text-[#849495] tracking-widest uppercase">
            Sector 7G
          </span>
        </div>
        
        {/* Holographic glowing separator line */}
        <div className="h-1 w-full bg-[#2d3546] rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-[#00dbe9] to-white rounded-full shadow-[0_0_8px_rgba(0,219,233,0.8)]"></div>
        </div>
      </div>

      {/* Quests Lists */}
      <div className="space-y-4">
        {missions.map((mission) => {
          const runState = activeMissions[mission.id];
          const isCountdown = runState?.state === 'COUNTDOWN';
          const isActive = runState?.state === 'ACTIVE';
          const isSuccess = runState?.state === 'SUCCESS';

          return (
            <article 
              key={mission.id}
              className={`glass-panel rounded-xl p-5 relative overflow-hidden group transition-all duration-300 ${
                isActive ? 'neon-border-primary border border-[#00f0ff]' : 'border border-[#3b494b]/30'
              }`}
            >
              {/* Vertical category energy bar on left edge */}
              <div className={`absolute top-0 left-0 w-1 h-full ${
                mission.difficulty === 'HARD' 
                  ? 'bg-[#00f0ff]' 
                  : mission.difficulty === 'MEDIUM' 
                    ? 'bg-[#ffd700]' 
                    : 'bg-[#ffabf3]'
              }`} />

              {/* Title Section */}
              <div className="flex justify-between items-start mb-3">
                <div className="max-w-[75%]">
                  <span className="font-mono-jetbrains text-[10px] text-[#849495] mb-1 block uppercase tracking-wider font-semibold">
                    {mission.priority}
                  </span>
                  <h3 className="font-space text-md font-bold text-[#dbfcff] group-hover:text-[#7df4ff] transition-colors leading-tight">
                    {mission.title}
                  </h3>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] border font-mono-jetbrains font-bold select-none ${mission.badgeBorderClass}`}>
                  {mission.difficulty}
                </div>
              </div>

              {/* Timing clock dynamic logs */}
              <div className="flex items-center gap-1.5 mb-4 text-[#b9cacb]">
                <Clock size={14} className={isActive ? 'text-[#00dbe9] animate-spin-slow' : ''} />
                <span className={`font-mono-jetbrains text-xs tracking-widest font-semibold uppercase ${isActive ? 'text-[#00f0ff]' : ''}`}>
                  {isCountdown 
                    ? 'COMMENCING TRANSITION...' 
                    : isActive 
                      ? `ACTIVE TIME: ${formatElapsed(runState.elapsedSeconds)}` 
                      : `${mission.remainingTime} REMAINING`
                  }
                </span>
              </div>

              {/* XP and Gold rewards containers */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#131c2b] p-2 rounded border border-[#3b494b]/20">
                  <span className="font-mono-jetbrains text-[9px] text-[#849495] block uppercase mb-1">
                    XP Reward
                  </span>
                  <div className="flex items-center gap-1">
                    <Award size={13} className="text-[#ffd700]" />
                    <span className="font-mono-jetbrains text-xs text-[#ffe16d] font-bold">
                      +{mission.xpReward.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-[#131c2b] p-2 rounded border border-[#3b494b]/20">
                  <span className="font-mono-jetbrains text-[9px] text-[#849495] block uppercase mb-1">
                    Crystal Bonus
                  </span>
                  <div className="flex items-center gap-1">
                    <Database size={13} className="text-[#00f0ff]" />
                    <span className="font-mono-jetbrains text-xs text-[#00dbe9] font-bold">
                      {mission.creditsReward} CR
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Action Area buttons */}
              <div className="space-y-2">
                {!runState && (
                  <button 
                    onClick={() => handleStartMission(mission.id)}
                    className="w-full h-11 bg-[#2d3546] hover:bg-[#00f0ff] hover:text-[#002022] text-[#7df4ff] border border-[#3b494b]/40 font-mono-jetbrains text-xs font-bold rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150"
                  >
                    <Play size={12} fill="currentColor" /> START MISSION
                  </button>
                )}

                {isCountdown && (
                  <button 
                    className="w-full h-11 bg-[#262f3f] text-[#00dbe9] border border-[#00dbe9]/30 font-mono-jetbrains text-xs font-bold rounded-lg flex items-center justify-center gap-2 animate-pulse cursor-not-allowed"
                    disabled
                  >
                    PREPARING SHIP CONTROLS IN {runState.countdown}...
                  </button>
                )}

                {isActive && (
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleFinishMission(mission.id, mission.xpReward, mission.creditsReward)}
                      className="w-full h-11 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#002022] font-mono-jetbrains text-xs font-bold rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    >
                      <CheckCircle size={14} /> FINISH MISSION
                    </button>
                    <button 
                      onClick={() => handleAbortMission(mission.id, mission.difficulty)}
                      className="w-full py-1.5 text-[10px] text-red-400 font-mono-jetbrains flex items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <AlertTriangle size={10} /> ABORT TELEMETRY RUN
                    </button>
                  </div>
                )}

                {isSuccess && (
                  <div className="w-full h-11 border border-[#00dbe9]/50 rounded-lg flex items-center justify-center bg-[#00f0ff]/10">
                    <span className="font-mono-jetbrains text-xs font-bold text-[#00dbe9] tracking-wider animate-pulse">
                      MISSION COMPLETED successfully
                    </span>
                  </div>
                )}
              </div>
            </article>
          );
        })}

        {/* Footer loading text area */}
        <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
          <Info size={18} className="text-[#849495] animate-pulse" />
          <p className="font-mono-jetbrains text-[10px] uppercase text-[#849495] tracking-widest leading-none">
            Scanning for additional distress signals...
          </p>
        </div>
      </div>
    </div>
  );
}


