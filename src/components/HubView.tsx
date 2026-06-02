import React, { useState, useRef } from 'react';
import { Camera, Upload, Play, ShieldAlert, Award, Grid, Sparkles, AlertCircle, Bot, CloudLightning, Activity } from 'lucide-react';
import { District, UserStats } from '../types';
import { SoundEngine } from '../utils/audio';

interface HubViewProps {
  stats: UserStats;
  addXP: (amount: number) => void;
  districts: District[];
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
}

export function HubView({ stats, addXP, districts, toastMessage, triggerToast }: HubViewProps) {
  // HUD overlay scanner state
  const [hudActive, setHudActive] = useState(false);
  const [hudTitle, setHudTitle] = useState('POSTURE SCAN');
  const [hudDistrict, setHudDistrict] = useState('Health');
  const [hudProgress, setHudProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [scanSubtext, setScanSubtext] = useState('');
  const [scanComplete, setScanComplete] = useState(false);
  
  // Microphone recording simulated state
  const [isRecording, setIsRecording] = useState(false);

  // File Upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const startScanningHUD = (title: string, district: string) => {
    SoundEngine.playAction();
    setHudTitle(title);
    setHudDistrict(district);
    setHudProgress(0);
    setScanComplete(false);
    setHudActive(true);

    setScanStep('INITIALIZING SCAN MATRIX...');
    setScanSubtext('SCANNING GALACTIC GRID...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHudProgress(progress);

      if (progress === 24) {
        SoundEngine.playCountdown();
        setScanStep('CAPTURING HIGH FREQUENCY FRAME...');
        setScanSubtext('BIO-METRIC CAPTURE ACTIVE');
      } else if (progress === 50) {
        setScanStep('NEURAL VECTOR ANALYSIS...');
        setScanSubtext('EXTRACTING ALIGNMENT DATA');
      } else if (progress === 76) {
        setScanStep('COMPARE HABIT PROGRESS...');
        setScanSubtext('FETCHING HISTORY LOGS');
      }

      if (progress >= 100) {
        clearInterval(interval);
        SoundEngine.playSuccess();
        setScanComplete(true);
        setScanStep('SCAN RESULT ACQUIRED');
        setScanSubtext('AI DIAGNOSIS GENERATED');
      }
    }, 45);
  };

  const handleMicActivation = async () => {
    SoundEngine.playAction();
    setIsRecording(true);
    triggerToast('RECORDING AUDIO DATA...');
    
    try {
      // Prompt for audio use safely
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop stream immediately to release lock
      stream.getTracks().forEach(track => track.stop());
      
      // Keep state alive for 2.5s for cool UI effect
      setTimeout(() => {
        setIsRecording(false);
        startScanningHUD('NEURAL MIND SCAN', 'Mind');
      }, 2500);
    } catch (err) {
      triggerToast('MICROPHONE ACCESS DENIED');
      setIsRecording(false);
    }
  };

  const handleFileUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>, taskName: string, district: string) => {
    if (e.target.files && e.target.files[0]) {
      SoundEngine.playUpload();
      triggerToast('ALIASED FILE DETECTED, PRE-PROCESSING...');
      setTimeout(() => {
        startScanningHUD(taskName, district);
      }, 1200);
    }
  };

  const completeHudSync = () => {
    SoundEngine.playSuccess();
    setHudActive(false);
    addXP(50);
    triggerToast('SUCCESS! +50 XP SYNCHRONIZED');
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Top Banner Stats Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="font-mono-jetbrains text-[10px] text-[#00dbe9] uppercase tracking-widest leading-none mb-1">
              Current Rank
            </p>
            <h2 className="font-space text-2xl font-bold text-[#dbfcff] tracking-tight">
              {stats.rank}
            </h2>
          </div>
          <div className="text-right">
            <p className="font-mono-jetbrains text-xs text-[#849495]">
              Level <span className="text-[#dbfcff] font-bold">{stats.level}</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-[#18202f] rounded-full overflow-hidden border border-[#3b494b]/20">
            <div 
              className="h-full bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] transition-all duration-500 shadow-[0_0_8px_rgba(0,219,233,0.5)]" 
              style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between font-mono-jetbrains text-[11px] text-[#849495]">
            <span>{stats.xp} XP</span>
            <span>{stats.xpToNext} XP TO NEXT TIER</span>
          </div>
        </div>
      </section>

      {/* The 4 Districts Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Grid size={18} className="text-[#7df4ff]" />
          <h3 className="font-mono-jetbrains text-[12px] uppercase tracking-wider text-[#00f0ff]">
            Zone 3: The 4 Districts
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* HEALTH DISTRICT */}
          <div className="glass-panel rounded-xl p-4 border-l-4 border-l-[#00dbe9] relative group transition-all hover:scale-[1.005]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-space text-[#dbfcff] font-semibold text-lg">Health: Hull Integrity</h4>
                <p className="text-[10px] text-[#849495] font-mono-jetbrains mt-1">THE POSTURE FIX (AI VISION)</p>
              </div>
              <Activity className="text-[#00dbe9] opacity-70" size={20} />
            </div>

            {/* Simulated Frame */}
            <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-[#060e1d] border border-[#3b494b]/30 flex items-center justify-center relative">
              <img 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpE2K5v_09T36eTcSQSo75UQNoIyFnv8fWt1dzeO2wJjz9AiUBiNLqHdoK_1eD7DOWbrjUm9aigqFqNGnfg_J5q5QfBiZWTPOq8ekrLg2-5g9l8ER5oPEFfkeGxhyPEkXC45AMD8ykCz4Zh3xxCki6KP8AkcIuTCoBX05bwEYBzNhDEnplpX2OVVuZvBVPBl993zEPye3f6CRR6r67fPonnxCBUJgFpbVDqau0cgZDiCEGvI2K3QyqW7-0orWbEBo1y48_GLPhUR9K" 
                alt="Health posturing bone map scan overlay" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1323] to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></div>
                <span className="font-mono-jetbrains text-[10px] text-[#00f0ff] tracking-wider uppercase">AI SENSOR ACTIVE</span>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-11 rounded-lg bg-[#2d3546] border border-[#3b494b]/30 text-[#7df4ff] flex items-center justify-center active:scale-95 transition-all hover:bg-[#31394a]"
              >
                <Camera size={18} />
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 h-11 rounded-lg bg-[#2d3546] border border-[#3b494b]/30 text-[#7df4ff] font-mono-jetbrains text-xs flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#31394a]"
              >
                <Upload size={14} /> FILE UPLOAD
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => handleFileUploadSimulated(e, 'POSTURE SCAN', 'Health')}
                className="hidden" 
                accept="image/*" 
              />

              <button 
                onClick={() => startScanningHUD('POSTURE SCAN', 'Health')}
                className="w-full h-11 rounded-lg bg-[#00dbe9] hover:bg-[#7df4ff] text-[#002022] font-mono-jetbrains text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all neon-glow-primary uppercase"
              >
                <Activity size={14} /> CAPTURE DATA
              </button>
            </div>
          </div>

          {/* MIND DISTRICT */}
          <div className="glass-panel rounded-xl p-4 border-l-4 border-l-[#fe00fe] relative group transition-all hover:scale-[1.005]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-space text-[#dbfcff] font-semibold text-lg">Mind: Deflector Shields</h4>
                <p className="text-[10px] text-[#849495] font-mono-jetbrains mt-1">BRAIN DUMP (AI NLP)</p>
              </div>
              <Activity className="text-[#fe00fe] opacity-70" size={20} />
            </div>

            <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-[#060e1d] border border-[#3b494b]/30 flex items-center justify-center relative">
              <img 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy7JYi1HHLUHek7bxeoX5h3DpQqlER7YK2LqX0f9YW01dBQ6ML_TMJRbwe2mlZ_wNAqOGURQjUF79m5S-I3D9ie-q1txPofmKtkSOfYASTQmyC7ezxYV6mKgvR6zh53Jq-DdKCHy_dU3Khs5DFnTNss_YF_8MUKksebzLFpU2Pkw7eFm9ADTQePUvKnrbhG8WvZE9DL7AVMqf1jpzi-EUdFauEUdsLr3KbBfNg6Dn__IUyqQ7nYSIH3YbxEU8BvQ7VNJgzus6e83eL" 
                alt="Mind map focus vectors neural scan overlay" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1323] to-transparent"></div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/40">
                <span className="font-mono-jetbrains text-[10px] text-[#fe00fe] font-semibold">SHIELD 84%</span>
              </div>
            </div>

            <button 
              onClick={handleMicActivation}
              disabled={isRecording}
              className={`w-full h-11 rounded-lg font-mono-jetbrains text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-white uppercase ${
                isRecording 
                  ? 'bg-red-500 animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.6)]' 
                  : 'bg-[#fe00fe] hover:bg-[#ffabf3] text-[#500050] neon-glow-secondary'
              }`}
            >
              <CloudLightning size={14} className={isRecording ? 'animate-bounce' : ''} />
              {isRecording ? 'RECORDING MATRIX...' : 'ACTIVATE MICROPHONE'}
            </button>
          </div>

          {/* SCHOOL DISTRICT */}
          <div className="glass-panel rounded-xl p-4 border-l-4 border-l-[#ffd700] relative group transition-all hover:scale-[1.005]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-space text-[#dbfcff] font-semibold text-lg">School: Navigation Data</h4>
                <p className="text-[10px] text-[#849495] font-mono-jetbrains mt-1">ACTIVE RECALL (AI AUDIO)</p>
              </div>
              <Award className="text-[#ffd700] opacity-70" size={20} />
            </div>

            <button 
              onClick={() => startScanningHUD('DATA COMPARISON', 'School')}
              className="w-full h-11 rounded-lg bg-[#ffd700] hover:bg-[#ffe16d] text-[#705d00] font-mono-jetbrains text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play size={14} fill="currentColor" /> COMPARE DATA
            </button>

            <button 
              onClick={() => docInputRef.current?.click()}
              className="w-full mt-2 h-11 rounded-lg border border-[#3b494b]/50 text-[#849495] font-mono-jetbrains text-xs flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#18202f] hover:text-[#00f0ff] hover:border-[#00f0ff]/50"
            >
              <Upload size={12} /> UPLOAD PDF/DOC
            </button>
            <input 
              type="file" 
              ref={docInputRef} 
              onChange={(e) => handleFileUploadSimulated(e, 'EDU ANALYSIS', 'School')}
              className="hidden" 
              accept=".pdf,.doc,.docx,.txt" 
            />
          </div>

          {/* SKILLS DISTRICT */}
          <div className="glass-panel rounded-xl p-4 border-l-4 border-l-[#006970] relative group transition-all hover:scale-[1.005]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-space text-[#dbfcff] font-semibold text-lg">Skills: Thruster Agility</h4>
                <p className="text-[10px] text-[#849495] font-mono-jetbrains mt-1">FEYNMAN TECHNIQUE (AI TUTOR)</p>
              </div>
              <Bot className="text-[#7df4ff] opacity-70" size={20} />
            </div>

            <button 
              onClick={() => startScanningHUD('AI TUTOR TRIAL', 'Skills')}
              className="w-full h-11 rounded-lg border border-[#00dbe9] text-[#00dbe9] hover:bg-[#00dbe9]/10 font-mono-jetbrains text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all uppercase"
            >
              <Bot size={14} /> Launch AI Tutor
            </button>
          </div>
        </div>
      </section>

      {/* Multiplier Promo Panel */}
      <section className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={80} className="text-[#ffd700]" />
        </div>
        <div className="relative z-10">
          <p className="font-mono-jetbrains text-[10px] text-[#fe00fe] font-bold tracking-wider leading-none mb-1">
            STREAK MULTIPLIER
          </p>
          <h3 className="font-space text-3xl font-extrabold text-white mb-2">
            {stats.streakMultiplier.toFixed(1)}x
          </h3>
          <p className="text-xs text-[#849495] max-w-[200px] leading-relaxed">
            Maintaining a 7-day habit streak triggers significant resource boosts.
          </p>
        </div>
      </section>

      {/* FLOATING TOP/RIGHT ACTION CORNER */}
      <button 
        onClick={() => {
          SoundEngine.playClick();
          startScanningHUD('GLOBAL TELEMETRY', 'Diagnostics');
        }}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-[#18202f] border-2 border-[#00dbe9] text-[#00dbe9] flex items-center justify-center shadow-[0_0_15px_rgba(0,219,233,0.5)] active:scale-95 hover:scale-105 transition-all z-40"
      >
        <Upload size={22} />
      </button>

      {/* IMMERSIVE HUD OVERLAY DIALOG */}
      {hudActive && (
        <div className="fixed inset-0 z-[100] bg-[#0b1323]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300">
          
          {/* Scanning frame geometry */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Spinning holographic indicators */}
            <div className="absolute inset-0 border border-[#00dbe9]/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border-2 border-dashed border-[#00f0ff]/30 rounded-full"></div>
            <div className="absolute inset-8 border border-[#fe00fe]/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '6s' }}></div>
            
            {/* Real Scanning Content Box */}
            <div className="absolute inset-10 rounded-xl overflow-hidden border-2 border-[#00dbe9]/40 flex items-center justify-center bg-[#0b1323]">
              {hudDistrict === 'Health' ? (
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpE2K5v_09T36eTcSQSo75UQNoIyFnv8fWt1dzeO2wJjz9AiUBiNLqHdoK_1eD7DOWbrjUm9aigqFqNGnfg_J5q5QfBiZWTPOq8ekrLg2-5g9l8ER5oPEFfkeGxhyPEkXC45AMD8ykCz4Zh3xxCki6KP8AkcIuTCoBX05bwEYBzNhDEnplpX2OVVuZvBVPBl993zEPye3f6CRR6r67fPonnxCBUJgFpbVDqau0cgZDiCEGvI2K3QyqW7-0orWbEBo1y48_GLPhUR9K" 
                  alt="Bone scanning holographic matrix data" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
              ) : hudDistrict === 'Mind' ? (
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy7JYi1HHLUHek7bxeoX5h3DpQqlER7YK2LqX0f9YW01dBQ6ML_TMJRbwe2mlZ_wNAqOGURQjUF79m5S-I3D9ie-q1txPofmKtkSOfYASTQmyC7ezxYV6mKgvR6zh53Jq-DdKCHy_dU3Khs5DFnTNss_YF_8MUKksebzLFpU2Pkw7eFm9ADTQePUvKnrbhG8WvZE9DL7AVMqf1jpzi-EUdFauEUdsLr3KbBfNg6Dn__IUyqQ7nYSIH3YbxEU8BvQ7VNJgzus6e83eL" 
                  alt="Mind brain waves scanner readout" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Bot size={34} className="text-[#00dbe9] animate-pulse" />
                  <span className="text-[9px] font-mono-jetbrains text-[#849495] mt-1">DATA FLOW ACTIVE</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#00dbe9]/20 to-transparent"></div>
            </div>

            {/* Sweep vertical lines */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="scan-line"></div>
            </div>

            {/* Pulsating surrounding ripples */}
            <div className="absolute inset-0 rounded-full border-2 border-[#00f0ff]/30 pulse-ring"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#fe00fe]/20 pulse-ring" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* HUD scan titles */}
          <div className="text-center w-full px-8 space-y-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-space text-2xl font-bold text-[#dbfcff] tracking-widest uppercase">
                {scanStep}
              </h3>
              <p className="font-mono-jetbrains text-[#849495] text-xs uppercase tracking-widest">
                {scanSubtext}
              </p>
            </div>

            {/* Tactical progress line bars */}
            <div className="w-full max-w-sm h-1.5 bg-[#18202f] rounded-full overflow-hidden relative mx-auto">
              <div 
                className="absolute top-0 left-0 h-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] transition-all duration-150 ease-out"
                style={{ width: `${hudProgress}%` }}
              ></div>
            </div>

            {/* Live Holographic diagnosis results summary completed state */}
            {scanComplete && (
              <div className="w-full max-w-sm holographic-panel p-4 rounded-xl text-left mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center pb-2 border-b border-[#3b494b]/30">
                  <span className="font-mono-jetbrains text-xs text-[#00f0ff] tracking-wider uppercase font-bold">
                    AI RESOLUTION COMPLETE
                  </span>
                  <span className="font-mono-jetbrains font-bold text-lg text-white">88/100</span>
                </div>

                <div className="space-y-2">
                  <p className="font-mono-jetbrains text-[9px] text-[#849495] uppercase font-bold">
                    Tactical Recommendations
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-1.5 text-xs text-[#dbfcff]">
                      <span className="text-[#00f0ff] font-bold select-none">&rsaquo;</span>
                      <span>Initialize spinal alignment optimization vectors.</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs text-[#dbfcff]">
                      <span className="text-[#00f0ff] font-bold select-none">&rsaquo;</span>
                      <span>Elevate focal sightline 15% to minimize cervical strain.</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={completeHudSync}
                  className="w-full py-2.5 bg-[#00dbe9] hover:bg-[#7df4ff] text-[#002022] rounded-lg font-mono-jetbrains text-xs font-bold transition-all active:scale-[0.98]"
                >
                  SYNC RESULTS TO DATABASE
                </button>
              </div>
            )}

            {/* Fake systems readout indicators */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 text-[10px] font-mono-jetbrains text-[#00dbe9]/50 uppercase tracking-tighter pt-4 mx-auto border-t border-[#3b494b]/20">
              <div className="text-left">
                COORD: 42.083.11<br />
                SIGNAL: STABLE
              </div>
              <div className="text-right">
                LATENCY: 12ms<br />
                AUTH: GRANTED
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] glass-panel px-6 py-3 rounded-full border border-[#00f0ff]/40 flex items-center gap-3 animate-bounce shadow-[0_0_20px_rgba(0,219,233,0.3)]">
          <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></div>
          <span className="font-mono-jetbrains text-[11px] text-[#00f0ff] tracking-wider uppercase font-bold">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
