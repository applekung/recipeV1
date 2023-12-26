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
        // 토큰 스토어에서 받은 토큰 설정
        setAccessToken(response.data.accessToken);
        () => {
          toast.success('회원 가입에 성공했습니다!')}
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
