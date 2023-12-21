import React, { useState } from 'react'
import { dummyCategoriesData } from '../../public/dummy'

function UploadRecipe() {
  const [recipeMainImg, setRecipeMainImg] = useState('')
  const [mainImgVisible, setMainImageVisible] = useState(false)

  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [inputValue4, setInputValue4] = useState('')

  function inputImageHandler() {
    const mainInputBtn = document.querySelector('#uploadRecipeMainImg')
    mainInputBtn.click()
  }

  function previewImg(event) {
    // Set the main image source when the file input changes
    setMainImageVisible(true)
    setRecipeMainImg(URL.createObjectURL(event.target.files[0]))
  }

  const ingredientCategoryTitle = dummyCategoriesData[0].name
  const situationCategoryTitle = dummyCategoriesData[1].name
  const ingredientCategory = dummyCategoriesData.filter(
    (item) => item.id === 1,
  )[0].children
  const situationCategory = dummyCategoriesData.filter(
    (item) => item.id === 2,
  )[0].children
  //   console.log('ingredientCategoryTitle', ingredientCategoryTitle)
  //   console.log('ingredientCategory', ingredientCategory)
  //   console.log('situationCategoryTitle', situationCategoryTitle)
  //   console.log('situationCategory', situationCategory)

  function mainBtnClick() {
    const mainBtn = document.querySelector('.main-imgUpload-btn')
    mainBtn.click()
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="./src/components/uploadRecipe/uploadRecipe.css"
      />
      <div className="w-full flex items-center justify-center flex-col">
        <div className="main-container">
          {/* main img upload container */}
          <p className="main-title">레시피 등록</p>
          <div className="main-uploadImg-bg">
            {/* Use recipeMainImg state to display the uploaded image */}
            {mainImgVisible ? (
              <img
                src={recipeMainImg}
                className="main-imgUpload-btn-box"
                onClick={mainBtnClick}
                alt="Uploaded Main Image"
              />
            ) : (
              <img
                src="./src/assets/uploadRecipe/uploadMainfoodimg.png"
                className="main-imgUpload-btn-box"
                onClick={mainBtnClick}
                alt="Default Main Image"
              />
            )}
            <input
              className="main-imgUpload-btn"
              type="file"
              onChange={previewImg}
            />
          </div>

          <div className="recipe-box">
            <div className="item-title">레시피 제목</div>
            <input type="text" placeholder="예) 소고기 미역국" />
          </div>

          <div className="recipe-box">
            <div className="item-title">카테고리</div>
            <select>
              <option value="none">재료별</option>
              {ingredientCategory.map((item) => {
                return <option value={item.name}>{item.name}</option>
              })}
            </select>
            <select>
              <option value="none">상황별</option>
              {situationCategory.map((item) => {
                return <option value={item.name}>{item.name}</option>
              })}
            </select>
          </div>

          <div className="recipe-box">
            <div className="item-title">요리정보</div>
            <div className="info-box">
              <div>인원</div>
              <input className="infoInput" type="text" placeholder="인원" />
            </div>
            <div className="info-box">
              <div>시간</div>
              <input className="infoInput" type="text" placeholder="인원" />
            </div>
            <div className="info-box">
              <div>난이도</div>
              <input className="infoInput" type="text" placeholder="인원" />
            </div>
          </div>

          <div className="recipe-box">
            <div className="item-title">레시피 재료</div>
            <div className="add-ingredient-container">
              <div className="add-ingredient-input-container">
                <div className="add-ingredient-item">
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 돼지고기"
                  />
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 120g"
                  />
                </div>
                <div className="add-ingredient-item">
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 돼지고기"
                  />
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 120g"
                  />
                </div>
                <div className="add-ingredient-item">
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 돼지고기"
                  />
                  <input
                    className="add-ingredient-input"
                    type="text"
                    placeholder="예> 120g"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadRecipe
