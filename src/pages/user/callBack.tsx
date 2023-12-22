import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useTokenStore from '../../components/store/tokenStore';


const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, setAccessToken } = useTokenStore();

  useEffect(() => {
    // 서버에 인가코드 전송하는 함수
    const sendAuthorizationCodeToServer = async (code: string) => {
      try {
        const response = await axios.post('backendToken', {
          code,
        });

        // 토큰 스토어에서 받은 토큰 설정
        setAccessToken(response.data.accessToken);

        navigate('/nickname');
      } catch (error) {
        console.error('서버로 인가 코드를 전송하는 과정에서 오류가 발생:', error);
      }
    };
    // 현재 URL에서 인가코드 파라미터 값 가져오기
    const authorizationCode = new URLSearchParams(location.search).get('code');
    // 서버에 인가 코드 전송 함수 호출
    if (authorizationCode) {
      sendAuthorizationCodeToServer(authorizationCode);
      console.log('인가 코드:', authorizationCode);
    } else {
      console.error('인가 코드를 찾을 수 없음');
    }
  }, [location, navigate, setAccessToken]);

  return (
    <div>
      콜백 페이지
      <div></div>
    </div>
  );
};

export default Callback;