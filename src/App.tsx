import React from 'react';
import { Game } from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-300 mb-4 font-gothic">Gothic Cat Runner</h1>
      <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg shadow-purple-900/50 overflow-hidden">
        <Game />
      </div>
      <div className="text-purple-400 mt-4 text-center space-y-2">
        <p>Press SPACE to jump</p>
        <p>Press D or → to dash through obstacles</p>
        <p>Press S or ↓ to slide under high obstacles</p>
      </div>
    </div>
  );
}

export default App;