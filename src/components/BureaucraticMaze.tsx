import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Target, Trophy } from 'lucide-react';

interface MazeProps {
  addNotification: (message: string, type?: string) => void;
}

function BureaucraticMaze({ addNotification }: MazeProps) {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Simple 8x8 maze (1 = wall, 0 = path, 2 = goal, 3 = player, 4 = form)
  const [maze, setMaze] = useState([
    [3, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 4, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 4, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 2]
  ]);

  const [formsCollected, setFormsCollected] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCompleted) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted]);

  useEffect(() => {
    // Update player position in maze
    setMaze(prev => {
      const newMaze = prev.map(row => row.map(cell => cell === 3 ? 0 : cell));
      if (newMaze[playerPosition.y] && newMaze[playerPosition.y][playerPosition.x] !== undefined) {
        if (newMaze[playerPosition.y][playerPosition.x] === 4) {
          setFormsCollected(prev => prev + 1);
          addNotification("Found a required form! Only 47 more to go.", "warning");
        }
        newMaze[playerPosition.y][playerPosition.x] = newMaze[playerPosition.y][playerPosition.x] === 2 ? 2 : 3;
      }
      return newMaze;
    });

    // Check if reached goal
    if (maze[playerPosition.y] && maze[playerPosition.y][playerPosition.x] === 2) {
      setIsCompleted(true);
      addNotification("Maze completed! Unfortunately, this was just to get to the complaint desk.", "success");
    }
  }, [playerPosition]);

  const movePlayer = (direction: string) => {
    if (isCompleted) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, newY - 1);
        break;
      case 'down':
        newY = Math.min(maze.length - 1, newY + 1);
        break;
      case 'left':
        newX = Math.max(0, newX - 1);
        break;
      case 'right':
        newX = Math.min(maze[0].length - 1, newX + 1);
        break;
    }

    // Check if new position is not a wall
    if (maze[newY] && maze[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoves(prev => prev + 1);

      // Random bureaucratic obstacles
      if (Math.random() < 0.1) {
        const obstacles = [
          "A wild bureaucrat appeared! You must wait 3 turns.",
          "You found a form! But it's the wrong form.",
          "The path ahead requires a Walking Permit.",
          "A coffee break is mandatory. Please wait.",
          "The ground is lava! Just kidding, keep walking."
        ];
        addNotification(obstacles[Math.floor(Math.random() * obstacles.length)], "warning");
      }
    } else {
      addNotification("Cannot move there! That wall requires a Wall-Passing License.", "error");
    }
  };

  const resetMaze = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setMoves(0);
    setIsCompleted(false);
    setTimeElapsed(0);
    setFormsCollected(0);
    setMaze([
      [3, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 0, 1, 4, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 4, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 2]
    ]);
  };

  const getCellContent = (cell: number) => {
    switch (cell) {
      case 0: return '⬜'; // Empty path
      case 1: return '🟫'; // Wall
      case 2: return '🎯'; // Goal
      case 3: return '🤵'; // Player
      case 4: return '📄'; // Form
      default: return '⬜';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-cyan-500 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-2">
          Red Tape Maze
        </h2>
        <p className="text-gray-300 font-space-mono text-sm">
          Navigate through bureaucratic obstacles to reach the complaint desk
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-cyan-400 font-bold">{moves}</div>
          <div className="text-xs text-gray-400 font-space-mono">Moves</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-green-400 font-bold">{formatTime(timeElapsed)}</div>
          <div className="text-xs text-gray-400 font-space-mono">Time</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-yellow-400 font-bold">{formsCollected}</div>
          <div className="text-xs text-gray-400 font-space-mono">Forms</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-purple-400 font-bold">{isCompleted ? 'YES' : 'NO'}</div>
          <div className="text-xs text-gray-400 font-space-mono">Complete</div>
        </div>
      </div>

      {/* Maze Grid */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
        <div className="inline-block">
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="w-8 h-8 flex items-center justify-center text-lg border border-gray-600"
                >
                  {getCellContent(cell)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="text-center mb-6">
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-4">
          <div></div>
          <button
            onClick={() => movePlayer('up')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            disabled={isCompleted}
          >
            <ArrowUp className="text-white mx-auto" size={20} />
          </button>
          <div></div>
          
          <button
            onClick={() => movePlayer('left')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            disabled={isCompleted}
          >
            <ArrowLeft className="text-white mx-auto" size={20} />
          </button>
          <div className="flex items-center justify-center">
            <span className="text-2xl">🤵</span>
          </div>
          <button
            onClick={() => movePlayer('right')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            disabled={isCompleted}
          >
            <ArrowRight className="text-white mx-auto" size={20} />
          </button>
          
          <div></div>
          <button
            onClick={() => movePlayer('down')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            disabled={isCompleted}
          >
            <ArrowDown className="text-white mx-auto" size={20} />
          </button>
          <div></div>
        </div>

        <button
          onClick={resetMaze}
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-6 rounded font-space-mono transition-colors"
        >
          Reset Maze
        </button>
      </div>

      {/* Legend */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-bold text-cyan-400 mb-2 font-orbitron text-sm">Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-xs font-space-mono">
          <div>🤵 You (Lost Citizen)</div>
          <div>🟫 Bureaucratic Wall</div>
          <div>📄 Required Form</div>
          <div>🎯 Complaint Desk</div>
        </div>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="mt-4 bg-green-900 bg-opacity-20 border border-green-500 rounded-lg p-4 text-center">
          <Trophy className="text-green-400 mx-auto mb-2" size={32} />
          <h3 className="font-bold text-green-400 mb-2">Congratulations!</h3>
          <p className="text-green-200 text-sm font-space-mono">
            You reached the complaint desk! Unfortunately, it's closed for lunch.
            Please try again in 3-5 business years.
          </p>
        </div>
      )}
    </div>
  );
}

export default BureaucraticMaze;