import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const NicknameEdit: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        // 서버에서 id 데이터 가져오기 (id = 닉네임)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        if (response.data && response.data.id) {
          // 성공적으로 데이터를 가져왔을 때
          setId(response.data.id.toString());
          setLoading(false);
        } else {
          // 서버 응답에 유효한 데이터가 없을 때
          console.error('서버 응답에 유효한 데이터가 없습니다.');
          setLoading(false);
        }
      } catch (error) {
        // 데이터 가져오기 중 오류가 발생했을 때
        console.error('닉네임 불러오기 중 오류 발생:', error);
        setLoading(false);
      }
    };

    // 데이터 가져오기 함수 호출
    fetchId();
  }, []); // 빈 배열 전달

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 닉네임 입력 값 변경 시 호출
    setId(e.target.value);
  };

  const handleIdSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (validateId()) {
        // 닉네임 변경 요청
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {});
  
        if (response.data && response.data.id) {
          // 서버 응답이 성공하면 변경된 닉네임으로 변경 
          toast.success('닉네임이 변경되었습니다');
          setId(response.data.id.toString());
        }
      }
    } catch (error) {
      // 닉네임 변경 중 오류가 발생했을 때
      console.error('닉네임 변경 중 오류 발생:', error);
      toast.error('닉네임 변경 중 오류가 발생했습니다.');
    }
  };

  const validateId = (): boolean => {
    // 닉네임 유효성 검사
    if (id.length < 2 || id.length > 8) {
      setError('닉네임은 최소 2글자에서 최대 8글자 사이어야 합니다.');
      toast.error('닉네임은 최소 2글자에서 최대 8글자 사이어야 합니다.');
      return false;
    }

    // 유효성 검사 통과 시 에러 메시지
    setError(null);
    return true;
  };

  if (loading) {
    // 데이터를 가져오는 중일 때 로딩 메시지
    return <div>Loading...</div>;
  }
  // 데이터를 모두 가져온 후에 닉네임 변경 페이지 렌더링
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">닉네임 변경</h1>
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