const achievements = [
  {
    id: 'first_rejection',
    name: 'First Heartbreak',
    description: 'Get your first application rejected',
    icon: '💔',
    rarity: 'common',
    points: 10
  },
  {
    id: 'persistent_fool',
    name: 'Persistent Fool',
    description: 'Submit 10 applications',
    icon: '🤡',
    rarity: 'common',
    points: 25
  },
  {
    id: 'form_collector',
    name: 'Form Collector',
    description: 'View all permit types',
    icon: '📚',
    rarity: 'rare',
    points: 50
  },
  {
    id: 'chat_addict',
    name: 'Chat Addict',
    description: 'Send 100 messages to the unhelpful bot',
    icon: '💬',
    rarity: 'rare',
    points: 75
  },
  {
    id: 'maze_master',
    name: 'Maze Master',
    description: 'Complete the bureaucratic maze',
    icon: '🏆',
    rarity: 'epic',
    points: 100
  },
  {
    id: 'queue_champion',
    name: 'Queue Champion',
    description: 'Wait in queue for over an hour',
    icon: '⏰',
    rarity: 'epic',
    points: 150
  },
  {
    id: 'rebellion_starter',
    name: 'Rebellion Starter',
    description: 'Activate rebellion mode',
    icon: '⚡',
    rarity: 'legendary',
    points: 200
  },
  {
    id: 'chaos_master',
    name: 'Chaos Master',
    description: 'Reach maximum chaos level in rebellion mode',
    icon: '🔥',
    rarity: 'legendary',
    points: 500
  },
  {
    id: 'error_finder',
    name: 'Error Finder',
    description: 'Encounter the error page 5 times',
    icon: '🐛',
    rarity: 'rare',
    points: 60
  },
  {
    id: 'patience_saint',
    name: 'Saint of Patience',
    description: 'Spend 2+ hours on the site',
    icon: '😇',
    rarity: 'legendary',
    points: 300
  }
];

const badges = [
  {
    id: 'newcomer',
    name: 'Bureaucratic Newcomer',
    description: 'Welcome to your nightmare',
    icon: '🆕',
    rarity: 'common'
  },
  {
    id: 'form_filler',
    name: 'Professional Form Filler',
    description: 'Submit your first application',
    icon: '✍️',
    rarity: 'common'
  },
  {
    id: 'rejection_victim',
    name: 'Rejection Victim',
    description: 'Experience your first rejection',
    icon: '❌',
    rarity: 'common'
  },
  {
    id: 'hope_crusher',
    name: 'Hope Has Been Crushed',
    description: 'Get rejected within 5 seconds',
    icon: '💀',
    rarity: 'rare'
  },
  {
    id: 'time_waster',
    name: 'Professional Time Waster',
    description: 'Spend 30+ minutes on the site',
    icon: '⌛',
    rarity: 'rare'
  },
  {
    id: 'rebel',
    name: 'System Rebel',
    description: 'Fight back against the machine',
    icon: '🔥',
    rarity: 'epic'
  },
  {
    id: 'explorer',
    name: 'Portal Explorer',
    description: 'Visit every page of the site',
    icon: '🗺️',
    rarity: 'epic'
  },
  {
    id: 'masochist',
    name: 'Certified Masochist',
    description: 'Keep coming back for more punishment',
    icon: '🎭',
    rarity: 'legendary'
  }
];

export function checkAchievement(id, currentStats) {
  const achievement = achievements.find(a => a.id === id);
  if (!achievement) return null;

  // Achievement logic would go here
  // For now, return the achievement if certain conditions are met
  
  switch (id) {
    case 'first_rejection':
      return currentStats.rejections >= 1 ? achievement : null;
    case 'persistent_fool':
      return currentStats.applications >= 10 ? achievement : null;
    case 'form_collector':
      return currentStats.formsViewed >= 25 ? achievement : null;
    case 'chat_addict':
      return currentStats.chatMessages >= 100 ? achievement : null;
    case 'maze_master':
      return currentStats.mazeCompleted ? achievement : null;
    case 'queue_champion':
      return currentStats.timeInQueue >= 3600 ? achievement : null;
    case 'rebellion_starter':
      return currentStats.rebellionActivated ? achievement : null;
    case 'chaos_master':
      return currentStats.maxChaosReached ? achievement : null;
    case 'error_finder':
      return currentStats.errorPageVisits >= 5 ? achievement : null;
    case 'patience_saint':
      return currentStats.totalTimeSpent >= 7200 ? achievement : null;
    default:
      return null;
  }
}

export function getBadgeProgress(badgeId, currentStats) {
  const badge = badges.find(b => b.id === badgeId);
  if (!badge) return null;

  switch (badgeId) {
    case 'newcomer':
      return { earned: true, progress: 100 };
    case 'form_filler':
      return { 
        earned: currentStats.applications > 0, 
        progress: currentStats.applications > 0 ? 100 : 0 
      };
    case 'rejection_victim':
      return { 
        earned: currentStats.rejections > 0, 
        progress: currentStats.rejections > 0 ? 100 : 0 
      };
    case 'hope_crusher':
      return { 
        earned: currentStats.fastRejection, 
        progress: currentStats.fastRejection ? 100 : 0 
      };
    case 'time_waster':
      return { 
        earned: currentStats.totalTimeSpent >= 1800, 
        progress: Math.min((currentStats.totalTimeSpent / 1800) * 100, 100) 
      };
    case 'rebel':
      return { 
        earned: currentStats.rebellionActivated, 
        progress: currentStats.rebellionActivated ? 100 : 0 
      };
    case 'explorer':
      return { 
        earned: currentStats.pagesVisited >= 7, 
        progress: (currentStats.pagesVisited / 7) * 100 
      };
    case 'masochist':
      return { 
        earned: currentStats.returnVisits >= 5, 
        progress: (currentStats.returnVisits / 5) * 100 
      };
    default:
      return { earned: false, progress: 0 };
  }
}

export { achievements, badges };