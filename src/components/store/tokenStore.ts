// import { create } from 'zustand'

// interface TokenStore {
//   accessToken: string | null
//   setAccessToken: (token: string | null) => void
// }

// const useTokenStore = create<TokenStore>((set, get) => ({
//   accessToken: null,
//   setAccessToken: (newToken) => {
//     if (newToken === null || typeof newToken !== 'string') {
//       console.error('유효하지 않은 토큰 형식입니다.')
//     } else {
//       set(() => ({ accessToken: newToken }))
//     }
//   },
//   getAccessToken: () => get().accessToken,
// }))

// export default useTokenStore
