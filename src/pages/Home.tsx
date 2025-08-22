import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, FileText, Clock, AlertTriangle } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import QueueSystem from '../components/QueueSystem';
import BureaucraticMaze from '../components/BureaucraticMaze';

interface HomeProps {
  addNotification: (message: string, type?: string) => void;
}

function Home({ addNotification }: HomeProps) {
  const [showStars, setShowStars] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');

  useEffect(() => {
    setShowStars(true);
  }, []);

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    size: Math.random() * 3 + 1 + 'px',
    delay: Math.random() * 3 + 's'
  }));

  return (
    <div className="min-h-screen relative">
      {/* Animated Stars Background */}
      {showStars && (
        <div className="stars">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-4 glitch" data-text="GALACTIC BUREAUCRACY">
              <span className="text-cyan-400">GALACTIC</span>
              <br />
              <span className="text-purple-400">BUREAUCRACY</span>
            </h1>
            <p className="text-xl md:text-2xl font-space-mono text-gray-300 typewriter">
              Making the impossible more impossible since 2387
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 px-8 rounded-lg font-space-mono text-lg transition-all duration-300 hover-lift hover-glow"
            >
              <FileText className="inline-block mr-2" size={24} />
              Browse Permits
            </Link>
            <Link
              to="/application"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-lg font-space-mono text-lg transition-all duration-300 hover-lift hover-glow"
            >
              <Rocket className="inline-block mr-2" size={24} />
              Apply Now
            </Link>
            <Link
              to="/status"
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-4 px-8 rounded-lg font-space-mono text-lg transition-all duration-300 hover-lift hover-glow"
            >
              <Clock className="inline-block mr-2" size={24} />
              Check Status
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-cyan-400">
            Why Choose Galactic Bureaucracy?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🐌',
                title: 'Lightning-Slow Processing',
                description: 'Our applications move at the speed of continental drift!'
              },
              {
                icon: '💸',
                title: 'Premium Rejection Rates',
                description: '99.9% rejection rate - we\'re really good at saying no!'
              },
              {
                icon: '📋',
                title: 'Infinite Paperwork',
                description: 'Forms that generate more forms! It\'s forms all the way down!'
              },
              {
                icon: '🤖',
                title: 'AI-Powered Confusion',
                description: 'Our chatbot is trained to maximize your frustration!'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-600 hover:border-cyan-500 transition-all duration-300 hover-lift">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-2">{feature.title}</h3>
                <p className="text-gray-300 font-space-mono text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-orbitron font-bold text-cyan-400 mb-4">
              Choose Your Torture Method
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('queue')}
                className={`py-2 px-6 rounded font-space-mono transition-colors ${
                  activeTab === 'queue' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Queue System
              </button>
              <button
                onClick={() => setActiveTab('maze')}
                className={`py-2 px-6 rounded font-space-mono transition-colors ${
                  activeTab === 'maze' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Bureaucratic Maze
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-6 rounded font-space-mono transition-colors ${
                  activeTab === 'chat' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Unhelpful Chat
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'queue' && <QueueSystem addNotification={addNotification} />}
            {activeTab === 'maze' && <BureaucraticMaze addNotification={addNotification} />}
            {activeTab === 'chat' && (
              <div>
                <h3 className="text-2xl font-orbitron font-bold text-center mb-4 text-cyan-400">
                  Need Help? (We Don't Actually Help)
                </h3>
                <ChatBox addNotification={addNotification} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-12 bg-red-900 bg-opacity-20 border-t border-red-500">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-orbitron font-bold text-red-400 mb-4">
            MANDATORY DISCLAIMER
          </h2>
          <p className="text-red-200 font-space-mono max-w-3xl mx-auto leading-relaxed">
            By accessing this portal, you acknowledge that hope is futile, patience is meaningless, 
            and your time is worthless. All applications will be rejected on principle. 
            Refunds are not available, as they require a Refund Request Permit, 
            which has a 100% rejection rate. Thank you for your inevitable disappointment.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;