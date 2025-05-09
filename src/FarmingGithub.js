import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, User, Book, Plus, Upload, Check, X, Home, Leaf } from 'lucide-react';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import ProfilePage from "./components/ProfilePage";
import RepositoryPage from "./components/RepositoryPage";
import NewRepositoryForm from "./components/forms/NewRepositoryForm";
import NewTaskForm from "./components/forms/NewTaskForm";

// 앱 전체 상태를 관리하는 메인 컴포넌트
export default function FarmingGitHub() {
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
  
  // 현재 날짜 관련 상태
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // 농작물 목록
  const crops = ['토마토', '양배추', '감자', '당근', '오이', '고추', '상추', '딸기'];
  
  // 새 저장소 생성을 위한 상태
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [isCreatingRepo, setIsCreatingRepo] = useState(false);
  
  // 새 작업(task) 생성을 위한 상태
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskImage, setNewTaskImage] = useState(null);
  
  // 달력 관련 함수
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // 현재 달의 날짜별 작업 상태를 확인하는 함수
  const getDateActivity = (date) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    
    // 모든 저장소의 작업을 확인
    let hasActivity = false;
    repositories.forEach(repo => {
      repo.tasks.forEach(task => {
        if (task.date === formattedDate && task.completed) {
          hasActivity = true;
        }
      });
    });
    
    return hasActivity;
  };
  
  // 새 저장소 생성 함수
  const createNewRepository = () => {
    if (!newRepoName || !selectedCrop) return;
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const newRepo = {
      id: repositories.length + 1,
      name: newRepoName,
      crop: selectedCrop,
      description: newRepoDescription,
      created: formattedDate,
      lastUpdated: formattedDate,
      tasks: []
    };
    
    setRepositories([...repositories, newRepo]);
    setSelectedRepo(newRepo);
    setIsCreatingRepo(false);
    setNewRepoName('');
    setNewRepoDescription('');
    setSelectedCrop('');
    setCurrentPage('repository');
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
  
  // 이미지 업로드 처리 함수 (실제로는 이미지 URL을 생성하는 모의 함수)
  const handleImageUpload = () => {
    // 실제 구현에서는 파일 업로드 처리 로직이 들어갈 것입니다.
    // 여기서는 예시로 플레이스홀더 이미지를 사용합니다.
    setNewTaskImage('/api/placeholder/400/300');
  };
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentPage === 'main' && <MainPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'repository' && <RepositoryPage />}
    </div>
  );
}