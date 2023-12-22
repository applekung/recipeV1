import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sendAuthorizationCodeToServer = async (code : string) => {
      try {
        const response = await axios.post('backendToken', {
          code,
        });

        // 받은 토큰 저장
        localStorage.setItem('accessToken', response.data.accessToken);

        // 메인 페이지로 이동
        navigate('/');
      } catch (error) {
        console.error('서버로 인가 코드를 전송하는 과정에서 오류가 발생:', error);
      }
    };

    const authorizationCode = new URLSearchParams(location.search).get('code');

    if (authorizationCode) {
      sendAuthorizationCodeToServer(authorizationCode);
      console.log('인가 코드:', authorizationCode);
    } else {
      console.error('인가 코드를 찾을 수 없음');
    }
  }, [location, navigate]);

  return (
    <div>
      콜백 페이지
    </div>
  );
};

export default Callback;
