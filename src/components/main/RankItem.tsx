import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
    ListBySearchAPIResponse,
    RecipeCard,
  } from '../../fetch/APIResponsesTypes'
import RecipeItem from '../../components/list/RecipeItem'
import useIntersect from '../../components/list/useIntersect'
import { useQuery } from '@tanstack/react-query'
import fetchTestGet from '../../fetch/fetchTestGet'


function RankItem() {
    const [page, setPage] = useState(1)
    const items = 4
    const [recipes, setRecipes] = useState<RecipeCard[]>([])
    const [test, setTests] = useState<string[]>([])
    const category = '디저트'

    const { data, isLoading, isError } = useQuery<string>({
        queryKey: ['search', { category, items, page }],
        queryFn: fetchTestGet,
        enabled: !!category,
      })

    console.log('데이터 확인: ', data)
    //   if(!data) {
    //     throw new Error('에러')
    //   } 
    //   console.log('data', data)

      useEffect(()=>{
        if(data)
      setTests([...data])
    }, [data,category])
    
    // console.log('data')
    // console.log(data)
    // console.log('test')
    // console.log(test)
    //   setTests(data)
      
    return (
        <div className="flex flex-col items-center mb-24">
            <div className="grid w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-6 ">
                {test.length ? (
                    test.map((recipe, idx) => (
                        <RecipeItem
                            key={idx}
                            id={recipe.id}
                            title={recipe.id}
                            image={
                                'https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_640.jpg'
                            }
                            userId={'샐러드요정'}
                            postDate={new Date()}
                            avgRating={1.5}
                            reviewCnt={100}
                        />
                    ))
                ) : (
                    <div>"{category}"카테고리 인기레시피 4개</div>
                )}
            </div>
        </div>
    );
}

export default RankItem;
