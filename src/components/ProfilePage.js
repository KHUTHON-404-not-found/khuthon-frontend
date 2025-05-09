import React, { useState } from 'react';
import { Plus, Book } from 'lucide-react';
import NewRepositoryForm from './forms/NewRepositoryForm';

function ProfilePage({ repositories, setRepositories, setSelectedRepo, setCurrentPage, token }) {
  const [isCreatingRepo, setIsCreatingRepo] = useState(false);
  
  // 새 저장소 생성 함수
  const createNewRepository = (name, crop, description) => {
    if (!name || !crop) return;
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const newRepo = {
      id: repositories.length + 1,
      name: name,
      crop: crop,
      description: description,
      created: formattedDate,
      lastUpdated: formattedDate,
      tasks: []
    };
    
    setRepositories([...repositories, newRepo]);
    setSelectedRepo(newRepo);
    setIsCreatingRepo(false);
    setCurrentPage('repository');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 농사 일지</h2>
        <button 
          onClick={() => setIsCreatingRepo(true)} 
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={18} />
          <span>새 농사 일지</span>
        </button>
      </div>
      
      {isCreatingRepo ? (
        <NewRepositoryForm 
          setIsCreatingRepo={setIsCreatingRepo} 
          createNewRepository={createNewRepository}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <div 
              key={repo.id} 
              className="border rounded-lg p-4 bg-white cursor-pointer hover:border-green-500"
              onClick={() => {
                setSelectedRepo(repo);
                setCurrentPage('repository');
              }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Book className="text-green-600" />
                <h3 className="text-lg font-medium text-blue-600">{repo.name}</h3>
              </div>
              <p className="text-gray-600 mb-3">{repo.description}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>작물: {repo.crop}</span>
                <span>•</span>
                <span>작업 수: {repo.tasks.length}</span>
                <span>•</span>
                <span>마지막 업데이트: {repo.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;