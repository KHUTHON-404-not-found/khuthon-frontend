import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

function NewTaskForm({ setIsAddingTask, addNewTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskImage, setNewTaskImage] = useState(null);
  
  // 이미지 업로드 처리 함수 (실제로는 이미지 URL을 생성하는 모의 함수)
  const handleImageUpload = () => {
    // 실제 구현에서는 파일 업로드 처리 로직이 들어갈 것입니다.
    // 여기서는 예시로 플레이스홀더 이미지를 사용합니다.
    setNewTaskImage('/api/placeholder/400/300');
  };
  
  const handleSubmit = () => {
    if (!newTaskTitle) return;
    addNewTask(newTaskTitle, newTaskImage);
    setNewTaskTitle('');
    setNewTaskImage(null);
  };

  return (
    <div className="border rounded-lg p-4 mb-6 bg-gray-50">
      <h3 className="text-lg font-medium mb-4">새 작업 추가</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">작업 제목</label>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="예) 씨앗 심기, 물주기, 수확하기 등"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">인증 사진</label>
          <div className="flex items-center space-x-4">
            {newTaskImage ? (
              <div className="relative">
                <img src={newTaskImage} alt="인증 사진" className="w-32 h-32 rounded-md object-cover" />
                <button 
                  onClick={() => setNewTaskImage(null)} 
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleImageUpload} 
                className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                <Upload size={18} />
                <span>사진 업로드</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <button 
            onClick={() => setIsAddingTask(false)} 
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            취소
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={!newTaskTitle}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTaskForm;