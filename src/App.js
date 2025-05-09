import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import RepositoryPage from './components/RepositoryPage';
import token from "./token.js"
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: '토마토 재배',
      crop: '토마토',
      description: '2025년 봄 토마토 재배 일지',
      created: '2025-03-15',
      lastUpdated: '2025-05-01',
      tasks: [
        { id: 1, date: '2025-03-15', title: '씨앗 심기', completed: true, image: '/api/placeholder/400/300' },
        { id: 2, date: '2025-03-25', title: '첫 싹 관찰', completed: true, image: '/api/placeholder/400/300' },
        { id: 3, date: '2025-04-10', title: '물주기', completed: true, image: '/api/placeholder/400/300' },
        { id: 4, date: '2025-04-20', title: '잎 상태 확인', completed: true, image: '/api/placeholder/400/300' },
        { id: 5, date: '2025-05-01', title: '해충 관리', completed: true, image: '/api/placeholder/400/300' },
        { id: 6, date: '2025-05-09', title: '키 측정', completed: false, image: null }
      ]
    },
    {
      id: 2,
      name: '양배추 재배',
      crop: '양배추',
      description: '2025년 봄 양배추 재배 일지',
      created: '2025-04-05',
      lastUpdated: '2025-05-08',
      tasks: [
        { id: 1, date: '2025-04-05', title: '씨앗 심기', completed: true, image: '/api/placeholder/400/300' },
        { id: 2, date: '2025-04-15', title: '새싹 확인', completed: true, image: '/api/placeholder/400/300' },
        { id: 3, date: '2025-04-25', title: '물주기', completed: true, image: '/api/placeholder/400/300' },
        { id: 4, date: '2025-05-08', title: '영양제 공급', completed: true, image: '/api/placeholder/400/300' }
      ]
    }
  ]);
  
  // 현재 선택된 저장소(repository)
  const [selectedRepo, setSelectedRepo] = useState(null);

  return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} token={token} />
        
        {currentPage === 'main' && <MainPage repositories={repositories} token = {token} />}
        {currentPage === 'profile' && (
          <ProfilePage 
            repositories={repositories} 
            setRepositories={setRepositories}
            setSelectedRepo={setSelectedRepo}
            setCurrentPage={setCurrentPage}
            token = {token}
          />
        )}
        {currentPage === 'repository' && (
          <RepositoryPage 
            selectedRepo={selectedRepo} 
            setSelectedRepo={setSelectedRepo}
            repositories={repositories}
            setRepositories={setRepositories}
            setCurrentPage={setCurrentPage}
            token = {token}
          />
        )}
      </div>
  );
}

export default App;