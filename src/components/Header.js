import React from 'react';
import { Home, User, Leaf } from 'lucide-react';

function Header({ currentPage, setCurrentPage, token }) {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Leaf className="text-green-400" />
        <h1 className="text-xl font-bold">FarmingHub</h1>
      </div>
      <div className="flex space-x-6">
        <button 
          onClick={() => setCurrentPage('main')}
          className={`flex items-center space-x-2 ${currentPage === 'main' ? 'text-green-400' : ''}`}
        >
          <Home size={18} />
          <span>홈</span>
        </button>
        <button 
          onClick={() => setCurrentPage('profile')}
          className={`flex items-center space-x-2 ${currentPage === 'profile' ? 'text-green-400' : ''}`}
        >
          <User size={18} />
          <span>프로필</span>
        </button>
      </div>
    </div>
  );
}

export default Header;