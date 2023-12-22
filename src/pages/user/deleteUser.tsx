import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DeleteUser = () => {
  const [isProcessing, setProcessing] = useState(false);
  const userNavigate = useNavigate();

  const handleDeleteUser = async () => {
    const confirmMessage = '정말로 탈퇴하시겠습니까?';
    const isConfirmed = window.confirm(confirmMessage);

    if (!isConfirmed) {
      return;
    }

    try {
      setProcessing(true);
      await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
      userNavigate('/login');
      toast.success('회원 탈퇴가 성공적으로 처리되었습니다.');
    } catch (error) {
      console.error('회원 삭제 중 에러:', error);
      toast.error('회원 탈퇴 중 오류가 발생했습니다.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="">
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-sans text-2xl font-bold mb-4">회원탈퇴 전에 안내사항을 꼭 확인해주세요.</h1>
      <p className="font-sans mb-6">* 탈퇴하면 앞으로 이 계정으로 로그인할 수 없고 이 계정을 다시 복구할 수 없습니다<br></br>
        * 닉네임을 변경하고 싶다면 마이페이지 안의 닉네임 변경 탭에서 변경할 수 있습니다.<br></br>
        * 공공의 성격을 가진 게시물은 탈퇴 후에도 삭제되지 않으므로 반드시 직접 삭제하신 후 탈퇴해 주시기 바랍니다.</p>
        <p className="font-sans mb-8 text-xl font-bold">'확인'을 누르면 탈퇴가 처리되며 같은 아이디로 재가입 하더라도 기존 정보 복구는 
        불가능합니다.</p>
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
    </div>
  );
};

export default DeleteUser;
