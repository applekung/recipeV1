import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const NicknameEdit = () => {
  // 상태 변수
  const [id, setId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [newId, setNewId] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // 컴포넌트 마운트 시 로컬 스토리지에서 닉네임 가져오기
  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname')
    setId(storedNickname || '')
    setLoading(false)
  }, [])

  // 입력된 새로운 닉네임 변경 시 호출되는 함수
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewId(e.target.value)
    setError(null) // 사용자가 입력을 시작하면 이전 오류 지우기
  }

  // 닉네임 변경 양식 제출 시 호출되는 함수
  const handleIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 필요한 경우 유효성 검사 또는 추가 로직 수행
    if (newId.trim() === '') {
      setError('새로운 닉네임을 입력하세요.')
      return
    }

    // 새로운 닉네임을 로컬 스토리지에 저장하거나 API 호출 수행
    console.log('새로운 닉네임:', newId)
    toast.success('닉네임이 변경되었습니다.')

    // 상태 업데이트 또는 필요한 작업 수행
    setId(newId)
    setNewId('')
  }

  // 데이터 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <div className="border-t mt-4 pt-4 flex flex-col items-center justify-center h-screen mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">닉네임 변경</h1>
        <form onSubmit={handleIdSubmit} className="max-w-md">
          <label className="block mb-2">현재 닉네임: {id || '없음'}</label>
          <label className="block mb-4">
            새로운 닉네임:
            <input
              id="newId"
              type="text"
              value={newId}
              onChange={handleIdChange}
              className="border p-2 w-full"
            />
          </label>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded"
          >
            변경하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default NicknameEdit
