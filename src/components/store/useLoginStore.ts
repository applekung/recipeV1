import {create} from 'zustand';

interface LoginStore {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useLoginStore;