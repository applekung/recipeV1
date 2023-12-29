//header 아이콘 권한 판단 관련
//임의로 값 넣어서 확인해보기
import create from 'zustand';

interface UserState {
    userInfo: {
      username: string;
    };
    setUserInfo: (userInfo: { username: string }) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    administration: string | null;
    setadministration: (administration: string | null) => void;
  }

  const useUserStore = create<UserState>((set) => ({
    userInfo: { username: '' },
    setUserInfo: (userInfo) => set({ userInfo }),
    token: null,// 임의로 설정한 토큰 값
    administration: null,
    setToken: (token) => set({ token }),
    setadministration: (administration) => set({ administration })
}));
  
  export default useUserStore;

//기존코드
// import create from 'zustand';

// interface UserState {
//     userInfo: {
//       username: string;
//     };
//     setUserInfo: (userInfo: { username: string }) => void;
//     token: string | null;
//     setToken: (token: string | null) => void;
//   }

//   const useUserStore = create<UserState>((set) => ({
//     userInfo: { username: '' },
//     setUserInfo: (userInfo) => set({ userInfo }),
//     token: null,
//     setToken: (token) => set({ token }),
// }));
  
//   export default useUserStore;