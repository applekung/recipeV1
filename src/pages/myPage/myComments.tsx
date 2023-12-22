import React from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchTestComment from '../../fetch/fetchTestComment'

function MyComments() {
  const userId = 1

  const { data, isLoading, isError } = useQuery<string>({
    queryKey: ['comments', { userId }],
    queryFn: fetchTestComment,
  })

  return <div>ss</div>
}

export default MyComments
