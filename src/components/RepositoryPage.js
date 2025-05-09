import React from 'react';
import { ChevronLeft, Plus, Upload, Check, X } from 'lucide-react';
import NewTaskForm from './NewTaskForm';

const RepositoryPage = ({ 
  selectedRepo, 
  setSelectedRepo, 
  setCurrentPage, 
  repositories, 
  setRepositories, 
  isAddingTask, 
  setIsAddingTask, 
  newTaskTitle, 
  setNewTaskTitle, 
  newTaskImage, 
  setNewTaskImage,
  token 
}) => {
  // 저장소가 선택되지 않았을 경우 프로필 페이지로 이동
  if (!selectedRepo) {
    setCurrentPage('profile');
    return null;
  }

  // 이미지 업로드 처리 함수 (실제로는 이미지 URL을 생성하는 모의 함수)
  const handleImageUpload = () => {
    // 실제 구현에서는 파일 업로드 처리 로직이 들어갈 것입니다.
    // 여기서는 예시로 플레이스홀더 이미지를 사용합니다.
    setNewTaskImage('/api/placeholder/400/300');
  };

  // 새 작업 추가 함수
  const addNewTask = () => {
    if (!newTaskTitle || !selectedRepo) return;
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const newTask = {
      id: selectedRepo.tasks.length + 1,
      date: formattedDate,
      title: newTaskTitle,
      completed: newTaskImage ? true : false,
      image: newTaskImage || null
    };
    
    const updatedRepo = {
      ...selectedRepo,
      lastUpdated: formattedDate,
      tasks: [...selectedRepo.tasks, newTask]
    };
    
    const updatedRepositories = repositories.map(repo => 
      repo.id === selectedRepo.id ? updatedRepo : repo
    );
    
    setRepositories(updatedRepositories);
    setSelectedRepo(updatedRepo);
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskImage(null);
  };

  // 저장소에 작업이 없는 경우 작물 선택 화면 표시
  if (selectedRepo.tasks.length === 0) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentPage('profile')} 
            className="flex items-center space-x-2 text-blue-600"
          >
            <ChevronLeft size={18} />
            <span>프로필로 돌아가기</span>
          </button>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">{selectedRepo.name}</h2>
          <p className="text-gray-600 mb-8">{selectedRepo.description}</p>
          
          <div className="text-center p-8">
            <h3 className="text-xl font-medium mb-4">작업 추가하기</h3>
            <p className="text-gray-600 mb-6">이 농사 일지에 첫 번째 작업을 추가해보세요!</p>
            <button 
              onClick={() => setIsAddingTask(true)} 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              작업 추가하기
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // 작업 목록 표시
  return (
    <div className="p-6">
      <div className="mb-6">
        <button 
          onClick={() => setCurrentPage('profile')} 
          className="flex items-center space-x-2 text-blue-600"
        >
          <ChevronLeft size={18} />
          <span>프로필로 돌아가기</span>
        </button>
      </div>
      
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedRepo.name}</h2>
            <p className="text-gray-600">{selectedRepo.description}</p>
          </div>
          <button 
            onClick={() => setIsAddingTask(true)} 
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus size={18} />
            <span>작업 추가</span>
          </button>
        </div>
        
        {isAddingTask && (
          <NewTaskForm 
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskImage={newTaskImage}
            setNewTaskImage={setNewTaskImage}
            handleImageUpload={handleImageUpload}
            addNewTask={addNewTask}
            setIsAddingTask={setIsAddingTask}
          />
        )}
        
        <div className="divide-y">
          {selectedRepo.tasks.map((task) => (
            <div key={task.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    {task.completed ? (
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check size={16} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-gray-300"></div>
                    )}
                    <h4 className="text-lg font-medium">{task.title}</h4>
                  </div>
                  <div className="ml-8 mt-1 text-sm text-gray-500">
                    {task.date}
                  </div>
                </div>
                {task.completed && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">완료됨</span>
                )}
              </div>
              
              {task.image && (
                <div className="ml-8 mt-4">
                  <img src={task.image} alt={task.title} className="rounded-lg max-w-md" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepositoryPage;