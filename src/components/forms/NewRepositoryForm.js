import React, { useState } from 'react';

function NewRepositoryForm({ setIsCreatingRepo, createNewRepository }) {
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  
  // 농작물 목록
  const crops = ['토마토', '양배추', '감자', '당근', '오이', '고추', '상추', '딸기'];
  
  const handleSubmit = () => {
    createNewRepository(newRepoName, selectedCrop, newRepoDescription);
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h3 className="text-xl font-medium mb-4">새 농사 일지 만들기</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">농사 일지 이름</label>
          <input
            type="text"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="예) 2025년 봄 토마토 재배"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">설명 (선택사항)</label>
          <textarea
            value={newRepoDescription}
            onChange={(e) => setNewRepoDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="농사 일지에 대한 설명을 입력하세요."
            rows="3"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">작물 선택</label>
          <div className="grid grid-cols-4 gap-3">
            {crops.map((crop, index) => (
              <button
                key={index}
                onClick={() => setSelectedCrop(crop)}
                className={`p-3 border rounded-md text-center ${
                  selectedCrop === crop 
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => setIsCreatingRepo(false)} 
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            취소
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={!newRepoName || !selectedCrop}
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewRepositoryForm;