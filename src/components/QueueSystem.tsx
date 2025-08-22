import React, { useState, useEffect } from 'react';
import { Clock, Users, AlertCircle, Ticket } from 'lucide-react';

interface QueueSystemProps {
  addNotification: (message: string, type?: string) => void;
}

function QueueSystem({ addNotification }: QueueSystemProps) {
  const [myNumber, setMyNumber] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState(42);
  const [queueLength, setQueueLength] = useState(847291);
  const [estimatedWait, setEstimatedWait] = useState('∞ years');
  const [isInQueue, setIsInQueue] = useState(false);

  useEffect(() => {
    // Slowly update the current number being served
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        setCurrentNumber(prev => prev + 1);
        setQueueLength(prev => Math.max(prev - 1, 0));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const joinQueue = () => {
    const newNumber = Math.floor(Math.random() * 999999) + currentNumber + queueLength;
    setMyNumber(newNumber);
    setIsInQueue(true);
    setQueueLength(prev => prev + 1);
    
    // Calculate ridiculous wait time
    const waitTimes = [
      '847 years', '23 decades', '4 centuries', '∞ years', '7 lifetimes',
      'Until the heat death of the universe', 'Several geological epochs',
      'Longer than your patience will last', '999,999 business days'
    ];
    setEstimatedWait(waitTimes[Math.floor(Math.random() * waitTimes.length)]);
    
    addNotification(`Joined queue! Your number: ${newNumber}. Good luck!`, 'warning');
  };

  const leaveQueue = () => {
    setIsInQueue(false);
    setMyNumber(null);
    setQueueLength(prev => Math.max(prev - 1, 0));
    addNotification("Left queue. Your spot has been given to someone more patient.", "error");
  };

  const getPositionInQueue = () => {
    if (!myNumber) return 0;
    return Math.max(myNumber - currentNumber, 0);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-cyan-500 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="text-white" size={24} />
            <h2 className="font-orbitron font-bold text-white text-lg">Galactic Queue System</h2>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
            <span className="text-white font-space-mono text-sm">LIVE</span>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="text-cyan-400" size={20} />
              <span className="text-gray-400 font-space-mono text-sm">Now Serving</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400 font-orbitron">{currentNumber.toLocaleString()}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertCircle className="text-yellow-400" size={20} />
              <span className="text-gray-400 font-space-mono text-sm">In Queue</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400 font-orbitron">{queueLength.toLocaleString()}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="text-red-400" size={20} />
              <span className="text-gray-400 font-space-mono text-sm">Est. Wait</span>
            </div>
            <div className="text-lg font-bold text-red-400 font-space-mono">{estimatedWait}</div>
          </div>
        </div>

        {/* User's Ticket */}
        {isInQueue && myNumber && (
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 border-2 border-dashed border-purple-500 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-purple-300 font-space-mono mb-2">Your Ticket</div>
              <div className="text-6xl font-bold text-purple-400 font-orbitron mb-4">
                {myNumber.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-300">Position:</span>
                  <br />
                  <span className="text-white font-bold">{getPositionInQueue().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-purple-300">Issued:</span>
                  <br />
                  <span className="text-white font-bold">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          {!isInQueue ? (
            <button
              onClick={joinQueue}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-8 rounded-lg font-space-mono font-bold transition-all hover-glow"
            >
              Join Queue (Why Not?)
            </button>
          ) : (
            <button
              onClick={leaveQueue}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-space-mono font-bold transition-colors"
            >
              Leave Queue (Give Up)
            </button>
          )}
        </div>

        {/* Queue Stats */}
        <div className="mt-6 bg-gray-700 rounded-lg p-4">
          <h3 className="font-bold text-cyan-400 mb-2 font-orbitron">Queue Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-space-mono text-gray-300">
            <div>Average wait: 247 years</div>
            <div>Fastest service: 43 years</div>
            <div>People served today: 3</div>
            <div>People who gave up: 84,291</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-xs text-gray-500 font-space-mono text-center">
          * Queue positions are estimates. Actual wait times may exceed the lifespan of several civilizations.
          ** Leaving the queue forfeits all rights to complain about bureaucracy forever.
        </div>
      </div>
    </div>
  );
}

export default QueueSystem;