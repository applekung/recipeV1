// // Search.tsx
// import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Search = () => {
//     const navigate = useNavigate();
//     // 검색 키워드 걸리게하기
//     const [searchTerm, setSearchTerm] = useState<string>('');

//     // 검색 버튼을 클릭했을 때 실행되는 함수
//     const handleSearch = () => {
//         // 검색어가 비어있지 않으면 URL에 검색어를 추가하고 해당 페이지로 이동
//         if (searchTerm.trim() !== '') {
//             navigate(`/search/${searchTerm.trim()}`);
//             setSearchTerm('');
//         }
//     };

//     // 검색어 입력 필드의 값이 변경될 때 실행되는 함수
//     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     // 검색어 입력 필드에서 Enter 키를 눌렀을 때 실행되는 함수
//     const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="검색어를 입력해주세요"
//                 value={searchTerm}
//                 onChange={handleInputChange}
//                 onKeyPress={handleKeyPress}
//             />
//             <button onClick={handleSearch}>검색</button>
//         </div>
//     );
// };

// export default Search;
