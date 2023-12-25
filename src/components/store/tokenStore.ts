import { create } from 'zustand';

interface TokenStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  setAccessToken: (newToken) => {
    if (newToken === null || typeof newToken === 'string') {
      set((state) => ({ accessToken: newToken }));
    } else {
      console.error('유효하지 않은 토큰 형식입니다.');
    }
  },
}));

export default useTokenStore;