import React, { useState, useEffect } from 'react';
import { User, Award, CreditCard, Settings, Trophy, Star, Target, TrendingDown } from 'lucide-react';

interface ProfileProps {
  addNotification: (message: string, type?: string) => void;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedDate?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
}

function Profile({ addNotification }: ProfileProps) {
  const [galacticCredits, setGalacticCredits] = useState(42);
  const [userLevel, setUserLevel] = useState(Math.floor(Math.random() * 100) + 1);
  const [rejectionStreak, setRejectionStreak] = useState(157);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Initialize badges
    const badgeList: Badge[] = [
      {
        id: '1',
        name: 'First Rejection',
        description: 'Your first taste of bureaucratic disappointment',
        icon: '💔',
        rarity: 'common',
        earned: true,
        earnedDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Form Collector',
        description: 'Submitted 100 forms (all rejected)',
        icon: '📚',
        rarity: 'rare',
        earned: true,
        earnedDate: '2024-02-28'
      },
      {
        id: '3',
        name: 'Patience Master',
        description: 'Waited more than 10 years for a response',
        icon: '⏰',
        rarity: 'epic',
        earned: false
      },
      {
        id: '4',
        name: 'Rejection Connoisseur',
        description: 'Experienced 500 unique rejection reasons',
        icon: '🏆',
        rarity: 'legendary',
        earned: false
      },
      {
        id: '5',
        name: 'Hope Crusher',
        description: 'Had your dreams crushed in under 5 minutes',
        icon: '⚡',
        rarity: 'epic',
        earned: true,
        earnedDate: '2024-03-10'
      },
      {
        id: '6',
        name: 'Bureaucrat\'s Nightmare',
        description: 'Filed a complaint about the complaint process',
        icon: '😈',
        rarity: 'rare',
        earned: false
      }
    ];

    // Initialize achievements
    const achievementList: Achievement[] = [
      {
        id: '1',
        title: 'Serial Applicant',
        description: 'Submit 50 permit applications',
        progress: 23,
        total: 50,
        reward: '100 Galactic Credits'
      },
      {
        id: '2',
        title: 'Rejection Collector',
        description: 'Get rejected 1000 times',
        progress: 247,
        total: 1000,
        reward: 'Legendary Badge: "Glutton for Punishment"'
      },
      {
        id: '3',
        title: 'Chat Champion',
        description: 'Send 500 messages to the unhelpful chatbot',
        progress: 89,
        total: 500,
        reward: 'Special Access to Premium Rejections'
      },
      {
        id: '4',
        title: 'Time Waster',
        description: 'Spend 100+ hours in the portal',
        progress: 67,
        total: 100,
        reward: 'Certificate of Wasted Time'
      }
    ];

    setBadges(badgeList);
    setAchievements(achievementList);
  }, []);

  const handlePurchaseCredits = () => {
    addNotification("Credit purchase failed! Your money has been donated to the Bureaucratic Void.", "error");
  };

  const handleUpgradeProfile = () => {
    addNotification("Profile upgrade rejected! Your current level of disappointment is perfect.", "error");
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 text-gray-400';
      case 'rare': return 'border-blue-500 text-blue-400';
      case 'epic': return 'border-purple-500 text-purple-400';
      case 'legendary': return 'border-yellow-500 text-yellow-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const lockedBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bureaucrat-head w-24 h-24 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-orbitron font-bold mb-2">
          <span className="text-cyan-400">User</span>{' '}
          <span className="text-purple-400">Profile</span>
        </h1>
        <p className="text-gray-400 font-space-mono">
          Galactic ID: HOPELESS-{Math.random().toString(36).substr(2, 6).toUpperCase()}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 mb-6">
            <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-4 flex items-center">
              <TrendingDown className="mr-2" size={24} />
              Your Statistics
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-space-mono">Level</span>
                <span className="text-cyan-400 font-bold">{userLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-space-mono">Galactic Credits</span>
                <span className="text-green-400 font-bold">¤{galacticCredits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-space-mono">Rejection Streak</span>
                <span className="text-red-400 font-bold">{rejectionStreak}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-space-mono">Hope Level</span>
                <span className="text-gray-500 font-bold">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-space-mono">Despair Rating</span>
                <span className="text-purple-400 font-bold">Maximum</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handlePurchaseCredits}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors font-space-mono flex items-center justify-center space-x-2"
              >
                <CreditCard size={18} />
                <span>Buy More Credits</span>
              </button>
              <button
                onClick={handleUpgradeProfile}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition-colors font-space-mono flex items-center justify-center space-x-2"
              >
                <Settings size={18} />
                <span>Upgrade Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
            <h3 className="text-lg font-orbitron font-bold text-cyan-400 mb-4">Quick Actions</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left text-gray-300 hover:text-cyan-400 transition-colors font-space-mono">
                📋 View Application History
              </button>
              <button className="w-full text-left text-gray-300 hover:text-cyan-400 transition-colors font-space-mono">
                💬 Chat with Unhelpful Bot
              </button>
              <button className="w-full text-left text-gray-300 hover:text-cyan-400 transition-colors font-space-mono">
                📊 Rejection Analytics
              </button>
              <button className="w-full text-left text-gray-300 hover:text-cyan-400 transition-colors font-space-mono">
                🎯 Set Disappointment Goals
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Badges Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
            <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-6 flex items-center">
              <Award className="mr-2" size={24} />
              Badges of Dishonor
            </h2>

            {/* Earned Badges */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-green-400 mb-4">Earned ({earnedBadges.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`bg-gray-700 border-2 rounded-lg p-4 text-center hover-lift ${getRarityColor(badge.rarity)}`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-bold font-space-mono text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                    <p className="text-xs text-green-400">Earned: {badge.earnedDate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div>
              <h3 className="text-lg font-bold text-gray-400 mb-4">Locked ({lockedBadges.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-gray-900 border-2 border-gray-600 rounded-lg p-4 text-center opacity-50"
                  >
                    <div className="text-3xl mb-2 grayscale">❓</div>
                    <h4 className="font-bold font-space-mono text-sm mb-1 text-gray-500">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
            <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-6 flex items-center">
              <Target className="mr-2" size={24} />
              Achievements
            </h2>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-yellow-400 font-space-mono">{achievement.title}</h3>
                      <p className="text-gray-300 text-sm">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-space-mono text-gray-400">
                        {achievement.progress}/{achievement.total}
                      </div>
                    </div>
                  </div>
                  
                  <div className="progress-bar mb-2">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-green-400 font-space-mono">
                    Reward: {achievement.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6">
            <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-6 flex items-center">
              <Trophy className="mr-2" size={24} />
              Recent Activity
            </h2>

            <div className="space-y-3 font-space-mono text-sm">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Application for "Permission to Blink" rejected</span>
                <span className="text-gray-500 text-xs ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Chatbot conversation ended in frustration</span>
                <span className="text-gray-500 text-xs ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Form 42-B submission rejected for existing</span>
                <span className="text-gray-500 text-xs ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Badge earned: "Hope Crusher"</span>
                <span className="text-gray-500 text-xs ml-auto">3 days ago</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Application lost in bureaucratic void</span>
                <span className="text-gray-500 text-xs ml-auto">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;