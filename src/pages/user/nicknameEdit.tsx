import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NicknameEdit: React.FC = () => {
  // State 변수 선언
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 마운트될 때 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1'); //임시 api 테스트
        setId(response.data.id.toString());
        setLoading(false);
      } catch (error) {
        console.error('닉네임 불러오기 중 오류 발생:', error);
        setLoading(false);
      }
    };
    // 데이터 가져오는 함수 호출
    fetchId();
  }, []); // 빈 배열을 전달해서 한 번만 실행

  // 닉네임 입력 필드 값 변경
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  // 폼 제출
  const handleIdSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 입력된 닉네임이 유효하면 서버에 업데이트 요청
      if (validateId()) {
        const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
          id: parseInt(id, 10), 
        });

        // 서버 응답이 성공하면 페이지 새로고침
        if (response.data && response.data.id) {
          alert('닉네임이 변경되었습니다');
          window.location.reload(); 
        }
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
    }
  };

  // 닉네임 유효성 검사
  const validateId = (): boolean => {
    if (id.length < 2 || id.length > 8) {
      setError('닉네임은 최소 2글자에서 최대 8글자 사이어야 합니다.');
      return false;
    }

    setError(null);
    return true;
  };

  // 로딩 중이면 로딩 메시지 반환
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">닉네임 변경</h1>
        {/* 폼 제출 시 handleIdSubmit 함수 호출 */}
        <form onSubmit={handleIdSubmit} className="max-w-md">
          {/* 현재 닉네임 표시 */}
          <label className="block mb-2">
            현재 닉네임: {id || '없음'}
          </label>
          {/* 새로운 닉네임 입력 */}
          <label className="block mb-4">
            새로운 닉네임:
            <input
              id="newId"
              type="text"
              value={id}
              onChange={handleIdChange}
              className="border p-2 w-full"
            />
          </label>
          {/* 에러 메시지가 있으면 표시 */}
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {/* 변경 버튼 */}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded"
          >
            변경하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default NicknameEdit;