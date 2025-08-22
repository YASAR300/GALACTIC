import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertCircle, FileText, Star, Heart, ArrowLeftRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';

interface Permit {
  id: number;
  name: string;
  description: string;
  difficulty?: string;
  rejectionRate?: string;
  processingTime?: string;
  cost?: string;
}

interface PermitCardProps {
  permit: Permit;
  addNotification: (message: string, type?: string) => void;
}

function PermitCard({ permit, addNotification }: PermitCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selected, toggleSelect, max } = useCompare();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Impossible': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40';
      case 'Nightmare': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40';
      case 'Hard': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40';
      case 'Medium': return 'text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40';
      default: return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40';
    }
  };

  const handleQuickReject = () => {
    addNotification(`Application for "${permit.name}" has been automatically rejected due to insufficient paperwork!`, 'error');
  };

  const isSelected = selected.includes(permit.id);

  return (
    <div className="glass-card hover-lift shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-orbitron font-bold text-brand-700 dark:text-cyan-400 mb-2">
              {permit.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm font-space-mono leading-relaxed">
              {permit.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < 1 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Permit Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="glass-surface p-3">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">Difficulty</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded ${getDifficultyColor(permit.difficulty || 'Impossible')}`}>
              {permit.difficulty || 'Impossible'}
            </span>
          </div>

          <div className="glass-surface p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Clock size={16} className="text-yellow-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">Processing</span>
            </div>
            <span className="text-sm text-yellow-600 dark:text-yellow-400 font-space-mono">
              {permit.processingTime || '∞ years'}
            </span>
          </div>

          <div className="glass-surface p-3">
            <div className="flex items-center space-x-2 mb-1">
              <FileText size={16} className="text-purple-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">Rejection Rate</span>
            </div>
            <span className="text-sm text-purple-600 dark:text-purple-400 font-space-mono">
              {permit.rejectionRate || '99.9%'}
            </span>
          </div>

          <div className="glass-surface p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-green-600 dark:text-green-400">💰</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-space-mono">Cost</span>
            </div>
            <span className="text-sm text-green-700 dark:text-green-400 font-space-mono">
              {permit.cost || '500 Credits'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/application/${permit.id}`}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 px-4 rounded-lg transition-colors text-center font-space-mono text-sm hover-glow"
          >
            Apply Now (Futile)
          </Link>
          <button
            onClick={handleQuickReject}
            className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200 py-2 px-4 rounded-lg transition-colors font-space-mono text-sm"
          >
            Quick Reject
          </button>
          <button
            onClick={() => toggleFavorite(permit.id)}
            className={`py-2 px-3 rounded-lg border text-sm flex items-center gap-1 ${isFavorite(permit.id) ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-300/40' : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/10'}`}
            aria-pressed={isFavorite(permit.id)}
          >
            <Heart size={16} className={isFavorite(permit.id) ? 'fill-current' : ''} />
            {isFavorite(permit.id) ? 'Favorited' : 'Favorite'}
          </button>
          <button
            onClick={() => toggleSelect(permit.id)}
            disabled={!isSelected && selected.length >= max}
            className={`py-2 px-3 rounded-lg border text-sm flex items-center gap-1 ${isSelected ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300/40' : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/10'} ${!isSelected && selected.length >= max ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-pressed={isSelected}
          >
            <ArrowLeftRight size={16} />
            {isSelected ? 'Selected' : 'Compare'}
          </button>
        </div>

        {/* Warning */}
        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300/40 dark:border-yellow-600/40 rounded p-2">
          <p className="text-yellow-700 dark:text-yellow-200 text-xs font-space-mono">
            ⚠️ Warning: Application fees are non-refundable. Processing may take longer than your natural lifespan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PermitCard;