import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useStore } from '../../components/store/store'
import { toast } from 'react-hot-toast'

const Callback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAccessToken } = useStore()

  useEffect(() => {
    const sendAuthorizationCodeToServer = async (code: string) => {
      try {
          const response = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: '8c28dc1b469c8392a5e2773f5cc5dfdb',
            redirect_uri: `http://localhost:5173/oauth`,
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        // 토큰 스토어에서 받은 토큰 설정
        setAccessToken(response.data.access_token)
        toast.success('로그인에 성공했습니다.');
        navigate('/')
      } catch (error) {
        toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
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