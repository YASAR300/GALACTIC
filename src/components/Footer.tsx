import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const galacticYear = currentYear + 2387; // Galactic calendar adjustment

  return (
    <footer className="bg-gray-900 bg-opacity-90 border-t border-cyan-500 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌌</span>
              <span className="text-xl font-orbitron font-bold text-cyan-400">
                Galactic Bureau
              </span>
            </div>
            <p className="text-gray-400 font-space-mono text-sm leading-relaxed">
              The universe's most inefficient bureaucracy. Serving the galaxy with 
              unnecessary paperwork since {galacticYear - 500}. All permits subject to 
              random rejection. No refunds. Complaints must be filed in triplicate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-cyan-400 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/catalog" className="block text-gray-400 hover:text-cyan-400 transition-colors font-space-mono text-sm">
                📋 Permit Catalog
              </Link>
              <Link to="/status" className="block text-gray-400 hover:text-cyan-400 transition-colors font-space-mono text-sm">
                ⏳ Application Status
              </Link>
              <Link to="/rebellion" className="block text-gray-400 hover:text-cyan-400 transition-colors font-space-mono text-sm">
                ⚡ Rebellion Mode
              </Link>
              <Link to="/error" className="block text-gray-400 hover:text-cyan-400 transition-colors font-space-mono text-sm">
                💥 System Error
              </Link>
            </div>
          </div>

          {/* Contact Info (Fake) */}
          <div>
            <h3 className="font-orbitron font-bold text-cyan-400 mb-4">Contact</h3>
            <div className="text-gray-400 font-space-mono text-sm space-y-1">
              <p>🏛️ Ministry of Paperwork</p>
              <p>📍 Sector 7, Level ∞</p>
              <p>📞 1-800-NO-HELP</p>
              <p>📧 complaints@void.null</p>
              <p className="text-xs text-gray-500 mt-2">
                (All communications monitored by AI)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 font-space-mono text-xs mb-2 md:mb-0">
            © {galacticYear} Galactic Bureaucracy Portal. All rights reserved. 
            No rights actually reserved. Terms subject to change without notice.
          </div>
          <div className="flex space-x-4 text-xs text-gray-500">
            <button className="hover:text-cyan-400 transition-colors">Privacy Policy*</button>
            <button className="hover:text-cyan-400 transition-colors">Terms of Service**</button>
            <button className="hover:text-cyan-400 transition-colors">Cookie Policy***</button>
          </div>
        </div>

        {/* Fine Print */}
        <div className="text-center mt-4 text-xs text-gray-600 font-space-mono">
          <p>* Privacy not actually protected | ** Terms favor the house | *** We love cookies</p>
          <p className="mt-2">⚠️ This website is a satirical parody. No actual bureaucracy was harmed in its making.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;