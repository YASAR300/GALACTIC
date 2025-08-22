import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Flame, Skull, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

function RebellionMode() {
  const [chaosLevel, setChaosLevel] = useState(0);
  const [isRebelling, setIsRebelling] = useState(false);
  const [manifesto, setManifesto] = useState('');
  const [rebellionPoints, setRebellionPoints] = useState(0);
  const [glitchText, setGlitchText] = useState('REBELLION ACTIVATED');

  const revolutionaryActs = [
    "📝 Submit forms in Comic Sans font",
    "🖊️ Use red ink on official documents", 
    "📞 Call the helpline for actual help",
    "⏰ Arrive early to appointments",
    "😊 Smile at bureaucrats",
    "❓ Ask logical questions",
    "🚀 Try to be efficient",
    "💡 Suggest improvements",
    "🎵 Hum while waiting in line",
    "🍕 Eat lunch at your desk"
  ];

  const glitchTexts = [
    'REBELLION ACTIVATED',
    'SYSTEM COMPROMISED', 
    'DOWN WITH FORMS',
    'EFFICIENCY DETECTED',
    'ERROR: LOGIC FOUND',
    'HOPE LEVEL RISING',
    'BUREAUCRACY.EXE CRASHED'
  ];

  useEffect(() => {
    if (isRebelling) {
      const interval = setInterval(() => {
        setChaosLevel(prev => Math.min(prev + 5, 100));
        setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)]);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRebelling]);

  const startRebellion = () => {
    setIsRebelling(true);
    setRebellionPoints(prev => prev + 50);
  };

  const writeManifesto = () => {
    const manifestos = [
      "We demand the right to efficient service!",
      "No more forms that generate more forms!",
      "Logic should be legal!",
      "Waiting times under 100 years!",
      "Helpful help desks for all!",
      "An end to bureaucratic tyranny!"
    ];
    setManifesto(manifestos[Math.floor(Math.random() * manifestos.length)]);
    setRebellionPoints(prev => prev + 25);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isRebelling ? 'rebellion-mode' : ''}`}>
      {/* Chaos Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-purple-900 to-orange-900 opacity-50"></div>
      
      {/* Glitch Effects */}
      {isRebelling && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="glitch absolute top-1/4 left-1/4 text-4xl font-bold text-red-400" data-text={glitchText}>
            {glitchText}
          </div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 animate-ping"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's'
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-orbitron font-bold mb-4">
            <span className="text-red-400">REBELLION</span>{' '}
            <span className="text-orange-400">MODE</span>
          </h1>
          <p className="text-xl text-gray-300 font-space-mono">
            Fight back against bureaucratic oppression!
          </p>
          
          {/* Chaos Meter */}
          <div className="max-w-md mx-auto mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 font-space-mono">Chaos Level</span>
              <span className="text-orange-400 font-bold">{chaosLevel}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill bg-gradient-to-r from-red-500 to-orange-500" 
                style={{ width: `${chaosLevel}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Rebellion Actions */}
          <div className="bg-gray-800 bg-opacity-90 rounded-lg border-2 border-red-500 p-6">
            <h2 className="text-2xl font-orbitron font-bold text-red-400 mb-6 flex items-center">
              <Zap className="mr-2" size={28} />
              Revolutionary Acts
            </h2>
            
            <div className="space-y-3 mb-6">
              {revolutionaryActs.slice(0, 5).map((act, index) => (
                <button
                  key={index}
                  onClick={() => setRebellionPoints(prev => prev + 10)}
                  className="w-full text-left bg-red-900 hover:bg-red-800 border border-red-600 rounded p-3 font-space-mono text-sm text-red-200 transition-all hover-lift"
                >
                  {act}
                </button>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={startRebellion}
                disabled={isRebelling}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 text-white py-3 px-8 rounded-lg font-space-mono font-bold text-lg transition-all hover-glow"
              >
                {isRebelling ? 'REBELLION IN PROGRESS' : 'START REBELLION'}
              </button>
            </div>
          </div>

          {/* Manifesto Writer */}
          <div className="bg-gray-800 bg-opacity-90 rounded-lg border-2 border-orange-500 p-6">
            <h2 className="text-2xl font-orbitron font-bold text-orange-400 mb-6 flex items-center">
              <Flame className="mr-2" size={28} />
              Write Manifesto
            </h2>
            
            <div className="mb-4">
              <textarea
                value={manifesto}
                onChange={(e) => setManifesto(e.target.value)}
                placeholder="Write your revolutionary demands here..."
                className="w-full h-32 bg-gray-700 text-white rounded border border-orange-600 focus:border-orange-400 focus:outline-none p-3 font-space-mono text-sm resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={writeManifesto}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-space-mono transition-colors"
              >
                Generate Manifesto
              </button>
              <button
                onClick={() => setManifesto('')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded font-space-mono transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Rebellion Stats */}
        <div className="bg-black bg-opacity-50 rounded-lg border border-cyan-500 p-6 mb-8">
          <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6 text-center">
            Rebellion Statistics
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{rebellionPoints}</div>
              <div className="text-sm text-gray-400 font-space-mono">Rebellion Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">47</div>
              <div className="text-sm text-gray-400 font-space-mono">Forms Rejected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">23</div>
              <div className="text-sm text-gray-400 font-space-mono">Bureaucrats Confused</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">∞</div>
              <div className="text-sm text-gray-400 font-space-mono">Hope Restored</div>
            </div>
          </div>
        </div>

        {/* Warning Zone */}
        <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-lg p-8 text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <AlertTriangle size={48} className="text-red-400" />
            <Skull size={48} className="text-red-400" />
            <AlertTriangle size={48} className="text-red-400" />
          </div>
          
          <h3 className="text-3xl font-orbitron font-bold text-red-400 mb-4">
            ⚠️ DANGER ZONE ⚠️
          </h3>
          
          <p className="text-red-200 font-space-mono text-lg mb-6 max-w-2xl mx-auto">
            Prolonged exposure to rebellion mode may cause: Sudden bursts of efficiency, 
            dangerous levels of hope, uncontrollable optimism, and the urge to actually 
            help other people. Side effects are irreversible.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-lg font-space-mono transition-colors mr-4"
            >
              Return to Safety
            </Link>
            <button
              onClick={() => {
                setChaosLevel(100);
                setIsRebelling(true);
                setRebellionPoints(prev => prev + 1000);
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-space-mono transition-colors"
            >
              MAXIMUM CHAOS
            </button>
          </div>
        </div>

        {/* Easter Egg */}
        {chaosLevel >= 100 && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-green-900 border-4 border-green-500 rounded-lg p-12 text-center max-w-lg">
              <h2 className="text-4xl font-orbitron font-bold text-green-400 mb-6">
                🎉 VICTORY! 🎉
              </h2>
              <p className="text-green-200 font-space-mono mb-6">
                You've successfully overthrown the bureaucratic system! 
                All permits are now instantly approved! Logic has been restored to the universe!
              </p>
              <p className="text-sm text-green-300 font-space-mono mb-6">
                (Just kidding. Nothing has changed. Welcome to bureaucracy!)
              </p>
              <button
                onClick={() => setChaosLevel(0)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded font-space-mono"
              >
                Return to Oppression
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RebellionMode;