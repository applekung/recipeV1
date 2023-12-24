import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { dummyCategoriesData } from '../../../public/dummy'
import { Icon } from '@iconify/react';

function CategoryManagement() {
    const categories = dummyCategoriesData;

    return (
        <div className='mt-3 items-center w-full mx-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>카테고리 관리</h1>
            <hr className='mb-6' />

            {/* 카테고리 컨트롤 버튼 */}
            <div className='control text-sm font-bold'>
                <div className='flex md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-20 '>
                    <div className='flex items-center '>
                        <span>카테고리 추가</span>
                        <button className='w-10 h-10 bg-neutral-200 rounded-xl ml-2 mt-1 flex items-center justify-center'>
                            <Icon icon="ic:round-add" className='text-gray-600' />
                        </button>
                    </div>

                    <div className='flex items-center'>
                        <span>카테고리 삭제</span>
                        <button className='w-10 h-10 bg-neutral-200 rounded-xl ml-2 mt-1 flex items-center justify-center'>
                            <Icon icon="ph:minus-bold" className='text-gray-600' />
                        </button>
                    </div>
                </div>

                {/* <div className='flex md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-20 mt-6'>
                    <div className='flex items-center'>
                        <span>항목 위로 이동</span>
                        <button className='w-10 h-10 bg-neutral-200 rounded-xl ml-2 mt-1 flex items-center justify-center'>
                            <Icon icon="mingcute:up-fill" className='text-gray-600' />
                        </button>
                    </div>

                    <div className='flex items-center'>
                        <span>항목 아래 이동</span>
                        <button className='w-10 h-10 bg-neutral-200 rounded-xl ml-2 mt-1 flex items-center justify-center'>
                            <Icon icon="mingcute:down-fill" className='text-gray-600' />
                        </button>
                    </div>
                </div> */}
            </div>

            {/* 카테고리 생성 영역 */}
            <div className='flex justify-center mt-16'>
                {categories.map((category) => (
                    <div key={category.id} className='box w-52 h-60 bg-neutral-200 flex items-center flex-col ml-4'>
                        <h2 className='text-xl font-bold my-6'>{'>'}{category.name}</h2>
                        <ul className='list-disc pl-4'>
                            {category.children?.map((item) => (
                                <li key={item.id} className='text-sm mb-1'>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryManagement;
