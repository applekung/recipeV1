import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
// import useTokenStore from '../../components/store/tokenStore';
import { useStore } from '../../components/store/store'
import { toast } from 'react-hot-toast'

const Callback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { setAccessToken } = useTokenStore()
  const { setAccessToken } = useStore()

  useEffect(() => {
    const sendAuthorizationCodeToServer = async (code: string) => {
      try {
        const response = await axios.post(
          'http://localhost:3000/auth/login/kakao',
          {
            code,
            domain,
          },
        )
        console.log('after backend response: ', response.data)
        console.log('after backend response: ', response)
        // 토큰 스토어에서 받은 토큰 설정
        setAccessToken(response.data.accessToken);
        console.log('토큰:', response.data.accessToken);
        navigate('/')
      } catch (error) {
        console.error(
          '서버로 인가 코드를 전송하는 과정에서 오류가 발생:',
          error,
        )
        toast.error('회원 가입에 실패했습니다.')
        navigate('/login')
      }
    }

    const domain = 'http://localhost:5173'
    const authorizationCode = new URLSearchParams(location.search).get('code')

    if (authorizationCode) {
      sendAuthorizationCodeToServer(authorizationCode);
     // console.log('인가 코드:', authorizationCode);
    } else {
      console.error('인가 코드를 찾을 수 없음')
    }
  }, [location, navigate, setAccessToken])

  return (
    <div>
      
      <div></div>
    </div>
  )
}

export default Callback


// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const Callback: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const sendAuthorizationCodeToServer = async (code: string | null) => {
//       try {
//         if (!code) {
//           console.error('인가 코드를 찾을 수 없음');
//           return;
//         }

//         const response = await axios.post(
//           'http://localhost:3000/auth/login/kakao',
//           {
//             code,
//             domain: 'http://localhost:5173',
//           },
//         );

//         console.log('백엔드 받은 응답:', response.data);
        
//         const jwtToken: string = response.data.jwtToken;

//         // 콘솔에 토큰 값 출력
//         console.log('백엔드에서 받은 토큰:', jwtToken);

//         // 토큰 저장
//         saveAccessToken(jwtToken);

//         navigate('/login');
//       } catch (error) {
//         console.error('서버로 인가 코드를 전송하는 과정에서 오류 발생:', error);
//         toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
//         navigate('/login');
//       }
//     };

//     const authorizationCode: string | null = new URLSearchParams(location.search).get('code');
//     sendAuthorizationCodeToServer(authorizationCode);
//   }, [location, navigate]);

//   const saveAccessToken = (jwtToken: string) => {
//     localStorage.setItem('jwtToken', jwtToken);
//   };

//   const getAccessToken = (): string | null => {
//     return localStorage.getItem('jwtToken');
//   };

//   const removeAccessToken = () => {
//     localStorage.removeItem('jwtToken');
//   };

//   return (
//     <div>
//       {/* 필요한 컴포넌트 또는 로딩 인디케이터를 렌더링 */}
//     </div>
//   );
// };

// export default Callback;
