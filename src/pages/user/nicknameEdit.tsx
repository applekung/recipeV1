import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const NicknameEdit = () => {
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('응답 데이터:', response.data);
        if (response.data && response.data.id) {
          setId(response.data.id.toString());
          setLoading(false);
        } else {
          console.error('서버 응답에 유효한 데이터가 없습니다.');
          setLoading(false);
        }
      } catch (error) {
        console.error('닉네임 불러오기 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchName();
  }, []);

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleIdSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (validateId()) {
        const response = await axios.patch('https://jsonplaceholder.typicode.com/posts/1', {});
  
        console.log('응답 데이터:', response.data); // 응답 데이터를 콘솔에 출력
  
        if (response.data && response.data.id) {
          toast.success('닉네임이 변경되었습니다');
          setId(response.data.id.toString());
        }
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
      toast.error('닉네임 변경 중 오류가 발생했습니다.');
    }
  };

  const validateId = (): boolean => {
    if (id.length < 2 || id.length > 8) {
      setError('닉네임은 최소 2글자에서 최대 8글자 사이어야 합니다.');
      toast.error('닉네임은 최소 2글자에서 최대 8글자 사이어야 합니다.');
      return false;
    }

    setError(null);
    return true;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">닉네임 변경</h1>
        <form onSubmit={handleIdSubmit} className="max-w-md">
          <label className="block mb-2">
            현재 닉네임: {id || '없음'}
          </label>
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
          {error && <p className="text-red-500 mb-2">{error}</p>}
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