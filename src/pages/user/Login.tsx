import React from 'react';
import loginImage from './img/kakao_login.png';

const Login: React.FC = () => {
  const Rest_api_key: string = '8c28dc1b469c8392a5e2773f5cc5dfdb'; // REST API 키
  const redirect_uri: string = 'http://localhost:5173/oauth'; // 리다이렉트 URI
  const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">레시피 헤븐</h1>
      <h3 className="text-lg mb-6">로그인</h3>
      <button onClick={handleLogin} className="">
        <img src={loginImage} alt="카카오 로그인 버튼" />
      </button>
    </div>
  );
};
// 액세스 토큰 발급 필요
export default Login;