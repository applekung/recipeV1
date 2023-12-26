import React, { useState } from 'react';
import loginImage from '../../assets/userImg/kakao_login.png';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const Rest_api_key = import.meta.env.VITE_REST_API_KEY; // REST API 키
  const redirect_uri = import.meta.env.VITE_APP_REDIRECT_URI; // 리다이렉트 URI

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    setLoading(true);
    // 카카오 인증 URL로 이동
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-white-100">
        <div className="bg-gray-50 p-8 rounded shadow-md max-w-3xl">
          <h1 className="font-sans text-4xl mb-6 text-center font-semibold ">로그인</h1>
          <h6 className="font-sans text-center p-2">레시피헤븐의 다양한 서비스를 누리세요.</h6>
          <br />
          {/* 카카오 로그인 버튼 */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center text-white py-2 px-4 rounded cursor-pointer"
          >
            {loading ? '로딩 중...' : <img src={loginImage} alt="카카오 로그인 버튼" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;