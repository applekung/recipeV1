import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DeleteUser: React.FC = () => {
  const [isProcessing, setProcessing] = useState(false);
  const userNavigate = useNavigate();

  const handleDeleteUser = async () => {
    // 사용자 확인 창
    const confirmMessage = '정말로 탈퇴하시겠습니까?';
    const isConfirmed = window.confirm(confirmMessage);

    if (!isConfirmed) {
      // 사용자가 취소한 경우
      return;
    }

    try {
      setProcessing(true);
      // 회원 삭제를 위한 API 호출
      await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
      // 성공적으로 회원 삭제한 경우 다시 로그인 페이지로 이동 또는 다른 처리
      userNavigate('/login');
      // 성공 메시지
      toast.success('회원 탈퇴가 성공적으로 처리되었습니다.');
    } catch (error) {
      console.error('회원 삭제 중 에러:', error);
      // 에러 메시지
      toast.error('회원 탈퇴 중 오류가 발생했습니다.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">회원 탈퇴</h1>
      <p className="mb-6">탈퇴하면 앞으로 이 계정으로 로그인할 수 없고 이 계정을 다시 복구할 수 없습니다<br></br>
        * 닉네임을 변경하고 싶다면 마이페이지안의 닉네임 변경 탭에서 변경할 수 있습니다.<br></br>
        * 공공의 성격을 가진 게시물은 탈퇴 후에도 삭제되지 않으므로 반드시 직접 삭제하신 후 탈퇴해 주시기 바랍니다.</p>
        <p className="mb-8 text-xl font-bold">탈퇴하려면 아래 확인버튼을 클릭해주세요.</p>
      <div className="mb-8">
        <button
          className="bg-primary text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleDeleteUser}
          disabled={isProcessing}
        >
          {isProcessing ? '처리 중...' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;