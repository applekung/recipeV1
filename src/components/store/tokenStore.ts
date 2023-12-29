import {create} from 'zustand';

interface TokenStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useTokenStore;