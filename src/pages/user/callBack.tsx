import React, { useEffect } from 'react';
//import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Callback() {
  useEffect(() => {
    const handleAuthorizationCode = async () => {
      // URL에서 인가코드 추출
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');

      console.log('인가 코드:', authorizationCode); // 콘솔에 인가 코드 잘받아오는지 확인

      if (authorizationCode) {
        try {
          // 백엔드 서버의 URL
          const backendUrl = 'https://your-backend-server.com/auth/kakao';

          // 인가코드를 백엔드로 전송
          const response = await axios.post(backendUrl, {
            code: authorizationCode,
          });

          // 서버에서 받은 응답 처리
          console.log('백엔드에서 받은 응답:', response.data);

          // 토큰 로직 자리

          // navigate('/dashboard'); 
        } catch (error) {
          console.error('서버로 인가 코드를 전송하는 과정에서 오류가 발생:', error);
        }
      } else {
        console.error('인가 코드를 찾을 수 없음');
      }
    };

    // 인가코드 처리 함수 호출
    handleAuthorizationCode();
  }, []);

  return (
    <div>
      콜백 페이지
    </div>
  );
}

export default Callback;