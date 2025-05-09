import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function MainPage({ repositories, token }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());


  
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

  // 이번 달의 날짜별 작업이 있는지 확인
  const getTodaysTasks = (date) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const todaysTasks = [];
    
    repositories.forEach(repo => {
      repo.tasks.forEach(task => {
        if (task.date === formattedDate) {
          todaysTasks.push({
            repoName: repo.name,
            task: task
          });
        }
      });
    });
    
    return todaysTasks;
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  
  // 달력에 표시할 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">농사 일정</h2>
          <div className="flex items-center space-x-4">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">{currentYear}년 {monthNames[currentMonth]}</span>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="grid grid-cols-7 bg-gray-100">
            {weekdays.map((day, index) => (
              <div key={index} className="py-2 text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const todaysTasks = day ? getTodaysTasks(day) : [];
              const hasActivity = day ? getDateActivity(day) : false;
              
              return (
                <div 
                  key={index} 
                  className={`min-h-24 p-2 border-t border-l ${day ? 'bg-white' : 'bg-gray-50'}`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        {hasActivity && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                      </div>
                      
                      <div className="mt-1">
                        {todaysTasks.map((item, taskIndex) => (
                          <div key={taskIndex} className="text-xs p-1 mb-1 bg-gray-100 rounded truncate">
                            {item.task.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">농사 활동</h2>
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex flex-wrap">
            {[...Array(52)].map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {[...Array(7)].map((_, dayIndex) => {
                  // 실제 구현에서는 해당 날짜의 활동 여부에 따라 색상 결정
                  const activityLevel = Math.random(); // 예시를 위한 랜덤 활동 수준
                  let bgColor = 'bg-gray-200';
                  
                  if (activityLevel > 0.8) {
                    bgColor = 'bg-green-500';
                  } else if (activityLevel > 0.6) {
                    bgColor = 'bg-green-400';
                  } else if (activityLevel > 0.4) {
                    bgColor = 'bg-green-300';
                  } else if (activityLevel > 0.2) {
                    bgColor = 'bg-green-200';
                  }
                  
                  return (
                    <div 
                      key={dayIndex} 
                      className={`w-3 h-3 m-0.5 ${bgColor} rounded-sm`}
                      title={`활동 ${Math.round(activityLevel * 100)}%`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;