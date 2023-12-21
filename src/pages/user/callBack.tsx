import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 콜백 처리, 액세스 토큰 요청 추가
    
    // 로그인이 성공했다고 가정하고 메인 페이지로 이동
    navigate('/');
  }, []);

  return (
    <div>
      콜백 페이지
    </div>
  );
};

export default Callback;