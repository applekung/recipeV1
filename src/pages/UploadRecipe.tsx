import React, { useEffect, useState } from 'react'
import { realCategoryList } from '../../public/dummy'
import axios from 'axios'
// import '../../../team6-front/src/components/uploadRecipe/uploadRecipe.css'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UploadRecipe() {
  const ingredientCategoryList = realCategoryList
    .filter((item) => {
      return item.categoryName?.indexOf('재료별') === 0
    })
    .map((item) => {
      return item.categoryName?.split('_')[1]
    })

  const situationCategoryList = realCategoryList
    .filter((item) => {
      return item.categoryName?.indexOf('상황별') === 0
    })
    .map((item) => {
      return item.categoryName?.split('_')[1]
    })

  interface Ingredient {
    item: string
    unit: string
  }

  interface RecipeSequenceItem {
    stepNum: number
    des: string
    imgUrl: string
  }

  const [recipeName, setRecipeName] = useState<String>('')
  const [recipeMainImg, setRecipeMainImg] = useState<String>('')
  const [portion, setPortion] = useState<Number>()
  const [leadTime, setLeadTime] = useState<Number>()
  const [level, setLevel] = useState<Number>()
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { item: '', unit: '' },
  ])
  const [categoryIg, setCategoryIg] = useState<String>('')
  const [categorySt, setCategorySt] = useState<String>('')
  const [mainImgVisible, setMainImageVisible] = useState<boolean>(false)
  const [recipeSequenceItems, setRecipeSequenceItems] = useState<
    RecipeSequenceItem[]
  >([{ stepNum: 1, des: '', imgUrl: '' }])

  function mainBtnClick() {
    const mainBtn = document.querySelector('.main-imgUpload-btn')
    mainBtn.click()
  }

  const previewImg = (event: ChangeEvent<HTMLInputElement>) => {
    setMainImageVisible(true)
    setRecipeMainImg(URL.createObjectURL(event.target.files[0]))
  }

  function addRecipeSequenceBtnHandler() {
    const newItem = {
      stepNum: recipeSequenceItems.length + 1,
      des: '',
      imgUrl: '',
    }
    setRecipeSequenceItems([...recipeSequenceItems, newItem])
  }

  const handleStepChange = (index: number, key: string, value: string) => {
    const updatedSteps = [...recipeSequenceItems]
    updatedSteps[index][key] = value
    setRecipeSequenceItems(updatedSteps)
    console.log('recipe steps', recipeSequenceItems)
  }

  const handleIngredientChange = (
    index: number,
    key: string,
    value: string,
  ) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][key] = value
    setIngredients(updatedIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { item: '', unit: '' }])
  }

  function createRecipeData() {
    return {
      recipeName: recipeName,
      img: recipeMainImg,
      // img: 'asdasd',
      portion: portion,
      leadTime: leadTime,
      setCgIngredient: categoryIg,
      setCgSituation: categorySt,
      level: level,
      ingredient: ingredients,
      step: recipeSequenceItems,
      // user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWEiLCJpYXQiOjE3MDMyMzk5NDQsImV4cCI6MTcwMzI0MzU0NH0.GJoG8AWVI-2IwNrz-mVp5YOqCO0Z_Wje-qA9Ao1KUCU',
    }
  }



  const { recipeId } = useParams()

  const submit = async () => {
    try {
      const recipeData = createRecipeData()
      await axios.post(
        `http://kdt-sw-7-team06.elicecoding.com:3000/recipes`,
        recipeData,
      )
      console.log('레시피 등록 성공!', recipeData)
      console.log('전송 성공')
    } catch (e) {
      const recipeData = createRecipeData()
      console.log('전송 대 실패', recipeData)
      console.log('error', e)
    }
  }
  console.log('esradsasdasd', recipeId)
  // console.log('window.location.href', window.location)

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
              accept="image/*"
              onChange={previewImg}
            />
          </div>

          <div className="recipe-box">
            <div className="item-title">레시피 제목</div>
            <input
              className="add-ingredient-input"
              type="text"
              placeholder="예) 크리스마스 케이크"
              value={recipeName}
              onChange={(e) => {
                setRecipeName(e.target.value)
                console.log('rercipe title', recipeName)
              }}
            />
          </div>

          <div className="recipe-box">
            <div className="item-title">카테고리</div>
            <select
              className="select-item"
              onChange={(e) => {
                setCategoryIg(e.target.value)
              }}
            >
              <option value="none">재료별</option>
              {ingredientCategoryList.map((item) => {
                return <option value={item}>{item}</option>
              })}
            </select>
            <select
              className="select-item"
              onChange={(e) => {
                setCategorySt(e.target.value)
              }}
            >
              <option value="none">상황별</option>
              {situationCategoryList.map((item) => {
                return <option value={item}>{item}</option>
              })}
            </select>
          </div>

          <div className="recipe-box">
            <div className="item-title">요리정보</div>
            <div className="info-box">
              <div>인원</div>
              <input
                className="infoInput"
                type="text"
                placeholder="인원"
                value={portion}
                onChange={(e) => {
                  setPortion(Number(e.target.value))
                }}
              />
            </div>
            <div className="info-box">
              <div>시간</div>
              <input
                className="infoInput"
                type="text"
                placeholder="시간"
                value={leadTime}
                onChange={(e) => {
                  setLeadTime(Number(e.target.value))
                }}
              />
            </div>
            <div className="info-box">
              <div>난이도</div>
              <input
                className="infoInput"
                type="text"
                placeholder="난이도"
                value={level}
                onChange={(e) => {
                  setLevel(Number(e.target.value))
                }}
              />
            </div>
          </div>

          <div className="recipe-box">
            <div className="item-title">레시피 재료</div>
            <div className="add-ingredient-container">
              <div className="add-ingredient-input-container">
                {/* {ingredientitems} */}
                {ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <input
                      className="add-ingredient-input"
                      type="text"
                      placeholder="예: 닭"
                      value={ingredient.item}
                      onChange={(e) =>
                        handleIngredientChange(index, 'item', e.target.value)
                      }
                    />
                    <input
                      className="add-ingredient-input"
                      type="text"
                      placeholder="예: 한마리"
                      value={ingredient.unit}
                      onChange={(e) =>
                        handleIngredientChange(index, 'unit', e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <button onClick={addIngredient} className="addRecipeSequenceBtn">
                추가
              </button>
            </div>
          </div>

          <div className="sequence-container">
            <div className="item-title">요리 순서</div>
            <div className="alert-info">
              요리의맛이 좌우될 수 있는 중요한 부분은 빠짐없이 적어주세요
            </div>

            {/* sequence 컨테이너 */}
            {/* 현재는 이미지는 미 고려 우선은 텍스트만 서버에 전달 후 추후 이미지도 업로드 (백엔드와 상의 필요) */}
            <div className="sequence-item-container">
              {/* {recipeSuquenceItems} */}
              {recipeSequenceItems.map((item, index) => {
                return (
                  <div key={index} className="add-sequence-item">
                    <div className="add-sequence-item-title">{`Step ${item.stepNum}`}</div>

                    <div className="input-Sequence-item-box">
                      <textarea
                        className="add-sequence-item-input"
                        rows={3}
                        placeholder="예) 계란은 흰자와 노른자를 분리해준후 계란 흰자에 설탕을 넣어주면서 머랭을 만들어 줍니다.
이때 레몬즙을 넣으면 좀더 단단한 머랭이 만들어집니다."
                        value={item.des}
                        onChange={(e) =>
                          handleStepChange(index, 'des', e.target.value)
                        }
                      />

                      <input
                        id={`imageInput_${index}`}
                        className="add-sequence-item-img-input"
                        type="file"
                        accept="image/*"
                        onChange={
                          (e) =>
                            // file로 입력
                            handleStepChange(
                              index,
                              'imgUrl',
                              URL.createObjectURL(e.target.files[0]),
                            )
                          // handleStepChange(index, 'imgUrl', 'ㅇㅇㅇ')
                        }
                      />
                      {item.imgUrl === '' && (
                        <label
                          htmlFor={`imageInput_${index}`}
                          className="add-sequence-item-img-input-btn"
                        >
                          +
                        </label>
                      )}
                      {item.imgUrl && (
                        <img
                          src={item.imgUrl}
                          alt={`Step ${item.stepNum}`}
                          className="recipe-step-image"
                        />
                      )}
                    </div>
                  </div>
                )
              })}

              <button
                className="add-sequence-item-btn"
                onClick={addRecipeSequenceBtnHandler}
              >
                순서 추가
              </button>
            </div>
          </div>
        </div>

        <div className="saveBtnBox">
          <div className="saveBtn" onClick={submit}>
            레시피 등록
          </div>
          <Link to="/">
            <div className="cancelBtn">취소</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default UploadRecipe
