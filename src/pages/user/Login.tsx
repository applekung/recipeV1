import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/userImg/kakao_login.png';

const Login: React.FC = () => {
  const Rest_api_key = import.meta.env.VITE_REST_API_KEY; // REST API 키
  const redirect_uri = import.meta.env.VITE_APP_REDIRECT_URI; // 리다이렉트 URI

  // Kakao 인증 URL
  const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  // useNavigate 사용하여 라우터 네비게이션 설정
  const navigate = useNavigate();

  // 로딩 상태와 로딩 중 여부 관리 함수
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // 카카오 인증 URL로 이동
    window.location.href = kakaoURL;
  };
  /*const handleLogin = () => {
    setLoading(true);
    // 인증 URL로 이동
    navigate(kakaoURL);
  };*/

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl mb-6">로그인 / 회원가입</h1>
      {/* 카카오 로그인 버튼 */}
      <button onClick={handleLogin} disabled={loading} className="">
        {loading ? '로딩 중...' : <img src={loginImage} alt="카카오 로그인 버튼" />}
      </button>
    </div>
  );
};

export default Login;