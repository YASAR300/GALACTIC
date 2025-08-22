import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  const [errorCode, setErrorCode] = useState('404');
  const [glitchText, setGlitchText] = useState('SYSTEM ERROR');
  const [attempts, setAttempts] = useState(0);
  const [isGlitching, setIsGlitching] = useState(true);

  const errorCodes = [
    '404', '500', '418', '666', '∞', 'NaN', 'ERROR', 'NULL', 'VOID', '???'
  ];

  const glitchMessages = [
    'SYSTEM ERROR',
    'REALITY.EXE CRASHED',
    'UNIVERSE NOT FOUND',
    'LOGIC BUFFER OVERFLOW',
    'BUREAUCRACY STACK OVERFLOW',
    'HOPE.DLL MISSING',
    'SANITY CHECK FAILED',
    'EXISTENCE DEPRECATED'
  ];

  const errorDescriptions = [
    "The page you're looking for has been rejected on principle.",
    "This URL requires a Browsing Permit (Form 404-B).",
    "The server is currently experiencing an existential crisis.",
    "Your request has been forwarded to the Department of Lost Pages.",
    "This page exists in quantum superposition - both there and not there.",
    "The page you seek is in another bureaucratic dimension.",
    "Error 418: I'm a teapot (and also existentially confused).",
    "The page has been consumed by the Infinite Paperwork Void."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorCode(errorCodes[Math.floor(Math.random() * errorCodes.length)]);
      setGlitchText(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setAttempts(prev => prev + 1);
    setIsGlitching(!isGlitching);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Glitch Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 opacity-10"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 200 + 50 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              animation: `glitch ${Math.random() * 2 + 0.5}s infinite linear`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 text-center relative z-10">
        {/* Main Error Display */}
        <div className="max-w-2xl mx-auto">
          {/* Animated Error Code */}
          <div className={`text-9xl font-orbitron font-bold mb-8 ${isGlitching ? 'glitch' : ''}`} data-text={errorCode}>
            <span className="text-red-400">{errorCode}</span>
          </div>

          {/* Glitch Text */}
          <h1 className="text-4xl font-orbitron font-bold mb-6 glitch" data-text={glitchText}>
            <span className="text-cyan-400">{glitchText}</span>
          </h1>

          {/* Error Description */}
          <p className="text-xl text-gray-300 font-space-mono mb-8 leading-relaxed">
            {errorDescriptions[attempts % errorDescriptions.length]}
          </p>

          {/* Error Details */}
          <div className="bg-gray-800 bg-opacity-80 rounded-lg border-2 border-red-500 p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-left font-space-mono text-sm">
              <div>
                <span className="text-red-400">Error Type:</span>
                <br />
                <span className="text-white">Catastrophic Bureaucratic Failure</span>
              </div>
              <div>
                <span className="text-red-400">Timestamp:</span>
                <br />
                <span className="text-white">{new Date().toLocaleString()}</span>
              </div>
              <div>
                <span className="text-red-400">User Agent:</span>
                <br />
                <span className="text-white">Confused Citizen v{Math.random().toFixed(2)}</span>
              </div>
              <div>
                <span className="text-red-400">Hope Level:</span>
                <br />
                <span className="text-white">0.00%</span>
              </div>
            </div>
          </div>

          {/* Fake Stack Trace */}
          <div className="bg-black rounded-lg p-4 mb-8 text-left">
            <div className="text-red-400 font-space-mono text-xs mb-2">Stack Trace:</div>
            <div className="text-green-400 font-mono text-xs space-y-1 overflow-x-auto">
              <div>at Bureaucracy.processRequest(bureaucracy.js:404)</div>
              <div>at FormValidator.reject(validator.js:∞)</div>
              <div>at HopeDestroyer.crush(despair.js:666)</div>
              <div>at Universe.questionExistence(reality.js:null)</div>
              <div>at Main.causeFrustration(main.js:NaN)</div>
              <div className="text-red-400">FATAL: Maximum recursion depth exceeded in bureaucracy loop</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link
              to="/"
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-8 rounded-lg font-space-mono text-lg transition-all hover-glow flex items-center space-x-2"
            >
              <Home size={20} />
              <span>Return Home</span>
            </Link>
            
            <button
              onClick={handleRefresh}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-space-mono text-lg transition-all hover-glow flex items-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Try Again (Futile)</span>
            </button>
          </div>

          {/* Attempts Counter */}
          {attempts > 0 && (
            <div className="bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-lg p-4 mb-6">
              <p className="text-yellow-200 font-space-mono">
                Refresh attempts: {attempts}
                {attempts > 5 && " (Why do you keep trying?)"}
                {attempts > 10 && " (This is the definition of insanity)"}
                {attempts > 20 && " (We admire your persistence, but it's hopeless)"}
              </p>
            </div>
          )}

          {/* Helpful (Not Really) Suggestions */}
          <div className="bg-purple-900 bg-opacity-20 border border-purple-500 rounded-lg p-6">
            <h3 className="text-xl font-orbitron font-bold text-purple-400 mb-4 flex items-center justify-center">
              <Bug className="mr-2" size={24} />
              "Helpful" Suggestions
            </h3>
            <div className="space-y-2 text-purple-200 font-space-mono text-sm">
              <p>• Have you tried filing a Page Request Form (Form 404-A)?</p>
              <p>• This error requires a Error Viewing License to display properly</p>
              <p>• Try clearing your existential cache and cookies</p>
              <p>• The page might exist in a parallel bureaucratic universe</p>
              <p>• Have you considered that you might not deserve to see this page?</p>
            </div>
          </div>
        </div>

        {/* Floating Skulls Easter Egg */}
        {attempts > 15 && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <Skull
                key={i}
                size={40}
                className="absolute text-red-400 opacity-50 animate-bounce"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 2 + 's'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;