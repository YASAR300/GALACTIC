import React, { useState, useEffect } from 'react';
import { Search, Filter, Shuffle, TrendingDown, Heart } from 'lucide-react';
import PermitCard from '../components/PermitCard';
import permits from '../utils/permits';
import { useFavorites } from '../context/FavoritesContext';

interface CatalogProps {
  addNotification: (message: string, type?: string) => void;
}

function Catalog({ addNotification }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [filteredPermits, setFilteredPermits] = useState(permits);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    let result = permits.filter(permit =>
      permit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterDifficulty !== 'All') {
      result = result.filter(permit => permit.difficulty === filterDifficulty);
    }

    if (onlyFavorites) {
      result = result.filter(p => favorites.includes(p.id));
    }

    // Sort permits
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Nightmare': 4, 'Impossible': 5 };
          return (difficultyOrder[a.difficulty] || 5) - (difficultyOrder[b.difficulty] || 5);
        case 'rejection':
          return parseFloat(b.rejectionRate) - parseFloat(a.rejectionRate);
        case 'cost':
          return parseInt(a.cost) - parseInt(b.cost);
        default:
          return 0;
      }
    });

    setFilteredPermits(result);
  }, [searchTerm, filterDifficulty, sortBy, onlyFavorites, favorites]);

  const handleRandomPermit = () => {
    const randomPermit = permits[Math.floor(Math.random() * permits.length)];
    addNotification(`Random permit selected: "${randomPermit.name}" - Guaranteed to be rejected!`, 'warning');
  };

  const totalRejections = permits.reduce((sum, permit) => 
    sum + parseFloat(permit.rejectionRate || '0'), 0
  );

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
          <span className="text-brand-600 dark:text-cyan-400">Permit</span>{' '}
          <span className="text-purple-600 dark:text-purple-400">Catalog</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-space-mono mb-6">
          Browse our extensive collection of rejectable permits
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-brand-600 dark:text-cyan-400">{permits.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-space-mono">Total Permits</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">99.2%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-space-mono">Avg Rejection Rate</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-space-mono">Processing Time</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-space-mono">Approved Today</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-6 mb-8">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search permits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 dark:bg-gray-800/70 text-inherit rounded-lg border border-white/10 focus:border-brand-500 focus:outline-none font-space-mono"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 dark:bg-gray-800/70 text-inherit rounded-lg border border-white/10 focus:border-brand-500 focus:outline-none font-space-mono appearance-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Nightmare">Nightmare</option>
              <option value="Impossible">Impossible</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 dark:bg-gray-800/70 text-inherit rounded-lg border border-white/10 focus:border-brand-500 focus:outline-none font-space-mono appearance-none"
            >
              <option value="name">Sort by Name</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="rejection">Sort by Rejection Rate</option>
              <option value="cost">Sort by Cost</option>
            </select>
          </div>

          {/* Favorites Toggle */}
          <button
            onClick={() => setOnlyFavorites(v => !v)}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2 ${onlyFavorites ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-300/40' : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/10'}`}
          >
            <Heart size={18} className={onlyFavorites ? 'fill-current' : ''} />
            <span>Favorites</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-gray-600 dark:text-gray-400 font-space-mono text-sm">
          Showing {filteredPermits.length} of {permits.length} permits
          {searchTerm && ` matching "${searchTerm}"`}
          {onlyFavorites && ' (favorites)'}
        </div>
      </div>

      {/* No Results */}
      {filteredPermits.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-orbitron font-bold text-gray-600 dark:text-gray-400 mb-2">No Permits Found</h2>
          <p className="text-gray-500 dark:text-gray-400 font-space-mono">
            Try adjusting your search criteria or surrender to bureaucratic despair.
          </p>
        </div>
      )}

      {/* Permits Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredPermits.map((permit) => (
          <PermitCard
            key={permit.id}
            permit={permit}
            addNotification={addNotification}
          />
        ))}
      </div>

      {/* Bottom Warning */}
      <div className="mt-16 glass-card p-6 text-center">
        <h3 className="text-xl font-orbitron font-bold text-yellow-700 dark:text-yellow-400 mb-4">
          ⚠️ BUREAUCRATIC WARNING ⚠️
        </h3>
        <p className="text-yellow-700 dark:text-yellow-200 font-space-mono">
          All permits are subject to random policy changes, cosmic interference, and the whims of 
          interdimensional bureaucrats. Side effects may include existential dread, 
          temporal paradoxes, and an overwhelming urge to file more paperwork.
        </p>
      </div>
    </div>
  );
}

export default Catalog;