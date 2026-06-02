export interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  credits: number;
  rank: string;
  avatar: string;
  streakMultiplier: number;
}

export type DistrictId = 'health' | 'mind' | 'school' | 'skills';

export interface District {
  id: DistrictId;
  name: string;
  tagline: string;
  icon: string;
  score: number;
  status: string;
  description: string;
  image: string;
  colorBorderClass: string;
}

export interface Mission {
  id: number;
  priority: string;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  remainingTime: string;
  xpReward: number;
  creditsReward: number;
  bgColorClass: string;
  badgeBorderClass: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: 'ship' | 'defense' | 'avatar';
  rarity: 'COMMON' | 'RARE' | 'LEGENDARY';
  price: number;
  image: string;
  purchased: boolean;
  equipped?: boolean;
}

export interface EquippedGear {
  headgear: GearItem | null;
  bodysuit: GearItem | null;
}
