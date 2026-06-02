import { District, Mission, GearItem } from '../types';

export const INITIAL_DISTRICTS: District[] = [
  {
    id: 'health',
    name: 'Health: Hull Integrity',
    tagline: 'THE POSTURE FIX (AI VISION)',
    icon: 'medical_services',
    score: 88,
    status: 'ACTIVE',
    description: 'Postural diagnostics running. Upload alignment profile.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpE2K5v_09T36eTcSQSo75UQNoIyFnv8fWt1dzeO2wJjz9AiUBiNLqHdoK_1eD7DOWbrjUm9aigqFqNGnfg_J5q5QfBiZWTPOq8ekrLg2-5g9l8ER5oPEFfkeGxhyPEkXC45AMD8ykCz4Zh3xxCki6KP8AkcIuTCoBX05bwEYBzNhDEnplpX2OVVuZvBVPBl993zEPye3f6CRR6r67fPonnxCBUJgFpbVDqau0cgZDiCEGvI2K3QyqW7-0orWbEBo1y48_GLPhUR9K',
    colorBorderClass: 'border-l-primary-fixed-dim'
  },
  {
    id: 'mind',
    name: 'Mind: Deflector Shields',
    tagline: 'BRAIN DUMP (AI NLP)',
    icon: 'psychology',
    score: 92,
    status: 'SHIELD 84%',
    description: 'Mental focus dump synchronization in progress.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy7JYi1HHLUHek7bxeoX5h3DpQqlER7YK2LqX0f9YW01dBQ6ML_TMJRbwe2mlZ_wNAqOGURQjUF79m5S-I3D9ie-q1txPofmKtkSOfYASTQmyC7ezxYV6mKgvR6zh53Jq-DdKCHy_dU3Khs5DFnTNss_YF_8MUKksebzLFpU2Pkw7eFm9ADTQePUvKnrbhG8WvZE9DL7AVMqf1jpzi-EUdFauEUdsLr3KbBfNg6Dn__IUyqQ7nYSIH3YbxEU8BvQ7VNJgzus6e83eL',
    colorBorderClass: 'border-l-secondary-container'
  },
  {
    id: 'school',
    name: 'School: Navigation Data',
    tagline: 'ACTIVE RECALL (AI AUDIO)',
    icon: 'school',
    score: 65,
    status: 'PENDING',
    description: 'Compare test vector scores and recall audio matrices.',
    image: '',
    colorBorderClass: 'border-l-tertiary-container'
  },
  {
    id: 'skills',
    name: 'Skills: Thruster Agility',
    tagline: 'FEYNMAN TECHNIQUE (AI TUTOR)',
    icon: 'rocket_launch',
    score: 74,
    status: 'ACTIVE',
    description: 'Launch dynamic tutor session for complex topic deconstruction.',
    image: '',
    colorBorderClass: 'border-l-on-primary-fixed-variant'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 1,
    priority: 'Priority: High Alpha',
    title: 'The Entropy Swarm Interception',
    difficulty: 'HARD',
    remainingTime: '02:10:37',
    xpReward: 4500,
    creditsReward: 150,
    bgColorClass: 'neon-border-cyan border-l-primary-fixed-dim',
    badgeBorderClass: 'bg-error-container/20 border-error/30 text-error'
  },
  {
    id: 2,
    priority: 'Daily Maintenance',
    title: 'Neural Core Synchronization',
    difficulty: 'EASY',
    remainingTime: '08:37:52',
    xpReward: 850,
    creditsReward: 25,
    bgColorClass: 'border-outline-variant/30 border-l-secondary',
    badgeBorderClass: 'bg-secondary-container/10 border-secondary/30 text-secondary'
  },
  {
    id: 3,
    priority: 'Elite Challenge',
    title: 'Void Engine Calibration',
    difficulty: 'MEDIUM',
    remainingTime: '00:54:04',
    xpReward: 1200,
    creditsReward: 50,
    bgColorClass: 'border-outline-variant/30 border-l-tertiary-container',
    badgeBorderClass: 'bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-container'
  }
];

export const INITIAL_SHOP_ITEMS: GearItem[] = [
  {
    id: 'featured_upgrade',
    name: 'Nebula Thruster Trail',
    category: 'ship',
    rarity: 'LEGENDARY',
    price: 4500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN7v1Yi5fvFtY2jYM7dgxLnYDPIp96TR_fNNDxlxQGuhQ-mrEZjoqpxarzaBvq_F75uQkrbNgWlehdFyfoUL4txVaAWaqC_lzagzcwg3_iEvKB2JYhJrq-pF8_4kRRRpSyQGD_CNFykWWEEo1UYpCQSEsF2-0oqthncxqUicOyKiDz7rD9ibMnDp9bwrHWQnzDnFqCpNEj0Th8f0s042eJqMTqTiUgMf2RlnH1Vz7rjcS2lKKDfXgrS6avdmJ_JqEqGcsLv_5zZ2tL',
    purchased: false
  },
  {
    id: 'item_1',
    name: 'Neon Thruster Trails',
    category: 'ship',
    rarity: 'RARE',
    price: 850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUZjPX-q3N3zNnZQegmCppXncwOcPPjaSMvY5ve_yqJmkfhz325z2M4AeBOQPS-kTAhj1C9FDUL-9gGBQzumLZm5aIERfQGChMe751u0NWb3HMnkPhJevgdlLjLqcCjCVYt77X6jDK2Nk4c4icF2xaDSn30kjqSoxOwQ_eXtCcTF4OlsF9s20cuLlo4mIOlWahDYXfMiAB5siW-p_WZaZsv7PtV5wp269paZDVNbo-Kz-op-n01apjktAnyk2koA-inW4f98ROu7p_',
    purchased: false
  },
  {
    id: 'item_2',
    name: 'Elite Squadron Decals',
    category: 'ship',
    rarity: 'COMMON',
    price: 300,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf3BB96zkptrDh2HbHWhEU6NTAclXUwy4Nwc2iUJH94dszcKh21L2zb4XjI_EbTQ8zCNG57njUJ3Q-2GcR6E4PWzGFpHfjNdW7JFmDMXeK4Ww4bAsie4EBYVs9ZH5yckRww2TGcu6gfVqwbqFBx17r2Ig7sqcNdvikGSd_6ufelrSFoBBxIqkJNnx17PCAm3H0ETT1LBMYryQ3u2bRfE4PGKManlZfhj00GStv8GFr0V_ugmJmrVbnAthP9w5159AvDx5mTwLR7ski',
    purchased: false
  },
  {
    id: 'defense_1',
    name: 'Shield Booster Mk. II',
    category: 'defense',
    rarity: 'RARE',
    price: 1100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4F7c3YdgXa0ayj6IA9duwZuEL0xghbR06cDCicDq_zDzXQ_TonzjrBvBXEqw3-9EEJF8rX9nppxs5aBhQfJU7bvcgms0yutlX5hEv6ajkXbzfylT4HGibpUeqFG6RcqsjJOphp5Sd0cImCkb6C0peHO3REGVaHHQ8jk6TtZ2Ps0vjThGHuwuMQkR8gcFeuRwla0aQk3VYhIYNsI3MqZUQC3ui72uYgEq2Nidw5O2PNxxzw862UIRdEBVMUZmqpghSu82FtC78rH1a',
    purchased: false
  },
  {
    id: 'defense_2',
    name: 'Hull Reinforcement',
    category: 'defense',
    rarity: 'COMMON',
    price: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP4gJs1Ij1wNkKqp2sCap9aHxG612q6CVGKcVb2nfRlUT6UwWsKov8rbbETf_yYUDhWiF9QqjvwzVOrEk-Inf7bMyZX7phDH64jfNUb_lthVz5y0RG-KZRWQLvX4x0AvitNQYPwwCaO6VC3CVzgsx7osGv7ozokCIC5NLbtqZFE7OueeCNmarF5mSMgU9MCpk4Wa8J8-EAt_H8yG1S81K-BlwxKOrWlKKKoih5Eyf1yJAKOg2Uw5tF3ANnjyRBF5fooL_Ho6edYEpt',
    purchased: false
  },
  {
    id: 'avatar_1',
    name: 'Vanguard Pilot Helmet',
    category: 'avatar',
    rarity: 'LEGENDARY',
    price: 2400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAtds0KmW8AqsiCGoDoaLdNQIIQMzCELIkj_VQbOVHkkpCRiuqUWp94o8jyR7kY8uSseRe1FO9Fhkt8xKxHYFr3YgLiwP3bEabYxLHQJKvAJBAJZZ4L9VJ1-ZKkYHzCmrsgS25a-CUwiZXRqUQlrLmxMCPfHkB6emKtBwcX6S3vHSu1oNFi1NkbpT_27JdGObZN9D--B3AlGGlC5Mz6WeqUva8UtHRKkHk_07Cpfb_2Amp0vEmd0gVCJDD3wmGy_uB1cEqr6ejJnvC',
    purchased: false
  }
];

export const RANK_PORTRAITS = {
  cadet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZdNiLfriQYq4YDjcdFf-euvwobDY12GuV2w-QD98L3cnfegY60xOiXItGrItTOCNI2lk1TNipqAofJjgDt76le9Ut_lvNxQe6zQMtxspN2sCxMINuEapI9jXd0CrG09ixi5yk8ftgNgCmuR8THw4cVniTSIL2K6FC3ZontdU7Pf8AQTGxYKJQTmj0FxYfS6YbdyrTjUyllHgOQ7kVuE07JZNHNUla8-tWl65kc-1ewf5XxqOCB4Hrx6bq3vBgYM1ufOcuJ3Na5Ex',
  pilot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIbtZOSWPoTpJXia6Tkac2IKrwv5BXS3XXhWIvXWMgXtpGWjYoPvnjLeLFGckoBCkwb5-PE0r3HG4cM10aHeJRMPiK8if_4_N2l1hY08rZDUFAvdu687qLXUgsUW1tlgMkOnimuh-S7WqSPAhGeIuSyBuYkRn4alQskFHg0p3TyXG98Hyrl2Twr-yurE9JP5ieY6Ywol5OwmpaRZ5wi0gqQk1mmp6uoZkAA25YODBZKQMi32kx1vlTegFmbSLXf7_3vXRSGtWROltZ',
  commander: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwJSk_A7qM-goyrNxQFjOEJzkKQZinXKwGz3N3Hx-KMIRftaW8iBCOJNuTdnf5_O8DeUJtC_Jk1kNu-lfXoZj0nu4r26AN62zCjjlWJf2OwzUPH24q55z0YNBuaLsYAJX9K87IU0OpVpxoICy_0AhWpoZT4KV4xSMEsXeomuiNdSGCXaFCnqzq0Q109nL9-5kl87tydAIDFBXv1LOYXuYq9bmvb6JNbWeF3gsxIA_3CPDFV9IA7OiCFyRqvZubULkzYDqFkuUiWMuG',
  sovereign: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmQy6JmBI56kz3tF4Nv6znYu9fDUIpkxBqSNIoZdbBfup1jLx41YT9-l5jo9zkGm7dYWFh0QTtOvCoiKXpFeJvRkssjSqxdlC8vep0nuswAGm2uZ0PB1c8JrENmIV49J6ELld3O4gpeAV-A9Uq2FeAAoVKSbvCTm1R1bu3pO6guN3uAAEclGEueqDqNBiK3Wqm6mZ2aPK55yVMH9YfgfpmjqvlL--8y2D8edml6EvDeb_XEiqS3QHj9fiilvijTfvLAWjbYjEEzHi'
};

export const RANK_RANGES = [
  { min: 1, max: 10, name: 'The Cadet', key: 'cadet' as const },
  { min: 11, max: 20, name: 'The Pilot', key: 'pilot' as const },
  { min: 21, max: 30, name: 'Flight Lead', key: 'pilot' as const },
  { min: 31, max: 40, name: 'Squadron Leader', key: 'pilot' as const },
  { min: 41, max: 50, name: 'Wing Commander', key: 'commander' as const },
  { min: 51, max: 60, name: 'Star Captain', key: 'commander' as const },
  { min: 61, max: 70, name: 'Fleet Admiral', key: 'commander' as const },
  { min: 71, max: 80, name: 'Galactic Sentinel', key: 'commander' as const },
  { min: 81, max: 90, name: 'System Overlord', key: 'sovereign' as const },
  { min: 91, max: 100, name: 'Cosmic Sovereign', key: 'sovereign' as const }
];

export const getRankInfo = (level: number) => {
  const found = RANK_RANGES.find(r => level >= r.min && level <= r.max);
  return found || (level > 100 ? { name: 'Cosmic Sovereign', key: 'sovereign' as const } : { name: 'The Cadet', key: 'cadet' as const });
};
