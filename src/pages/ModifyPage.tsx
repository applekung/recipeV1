import React, { useEffect, useState } from 'react'
import { dummyCategorList, previousData } from '../../public/dummy'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function ModifyRecipe() {
  // 카테고리 데이터 가져오는 api 구현 필요 등록 페이지에서 사용자가 어떤 재료이며 상황인지 받아와야함
  const ingredientCategoryTitle = dummyCategorList[0].name
  const situationCategoryTitle = dummyCategorList[1].name
  const ingredientCategory = dummyCategorList.filter((item) => item.id === 1)[0]
    .children
  const situationCategory = dummyCategorList.filter((item) => item.id === 2)[0]
    .children

  interface Ingredient {
    item: string
    unit: string
  }

  interface RecipeSequenceItem {
    stepNum: number
    des: string
    imgUrl: string
  }

  // const { recipeId } = useParams()
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = aait axios.get(
  //           `http://kdt-sw-7-team06.elicecoding.com:3000/${recipeId}`,
  //         )
  //       } catch (error) {
  //         console.error('Error fetching recipe data:', error)
  //       }
  //     }
  //   })

  const FkData = previousData[0]

  const [recipeName, setRecipeName] = useState<String>(FkData.recipeName)
  console.log('sadasdasdasdasd', recipeName)
  const [recipeMainImg, setRecipeMainImg] = useState<String>(FkData.img)
  const [portion, setPortion] = useState<Number>(FkData.portion)
  const [leadTime, setLeadTime] = useState<Number>(FkData.leadTime)
  const [level, setLevel] = useState<Number>(FkData.level)
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    FkData.ingredient,
  )
  const [categoryIg, setCategoryIg] = useState<String>(FkData.categoryIg)
  const [categorySt, setCategorySt] = useState<String>(FkData.categorySt)
  const [mainImgVisible, setMainImageVisible] = useState<boolean>(false)
  const [recipeSequenceItems, setRecipeSequenceItems] = useState<
    RecipeSequenceItem[]
  >(FkData.step)

  function mainBtnClick() {
    const mainBtn = document.querySelector('.main-imgUpload-btn')
    mainBtn.click()
  }
  
  const previewImg = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setMainImageVisible(true)
      setRecipeMainImg(URL.createObjectURL(selectedFile))
      console.log('대표 이미지 랜더링 성공')
    }
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
    console.log('ingredient', ingredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', stock: '' }])
  }

  function createRecipeData() {
    return {
      recipeName: recipeName,
      img: recipeMainImg,
      // img: 'hi',
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

  const submit = async () => {
    try {
      const recipeData = createRecipeData()

      await axios.post(
        // 'http://kdt-sw-7-team06.elicecoding.com:3000/recipe/insert',
        'https://jsonplaceholder.typicode.com/posts',
        recipeData,
      )

      console.log('success, Data', recipeData)
      console.log('전송 성공')
    } catch (e) {
      const recipeData = createRecipeData()
      console.log('fail, Data', recipeData)
      console.log('error', e)
    }
  }

  // const formData = new FormData()
  // formData.append('recipeName', recipeName)
  // formData.append('img', recipeMainImg)
  // formData.append('portion', portion)
  // formData.append('portion', portion)
  // formData.append('leadTime', leadTime)
  // formData.append('setCgIngredient', categoryIg)
  // formData.append('setCgSituation', categorySt)
  // formData.append('level', level)
  // formData.append('ingredient', JSON.stringify(ingredients))
  // formData.append('step', JSON.stringify(recipeSequenceItems))

  return (
    <>
      <link
        rel="stylesheet"
        href="./src/components/uploadRecipe/uploadRecipe.css"
      />
      <div className="w-full flex items-center justify-center flex-col">
        <div className="main-container">
          <p className="main-title">레시피 등록</p>
          <div className="main-uploadImg-bg">
            {recipeMainImg.length !== 0 ? (
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
              defaultValue={FkData.setCgIngredient}
              onChange={(e) => {
                setCategoryIg(e.target.value)
              }}
            >
              <option value="none">{ingredientCategoryTitle}</option>
              {ingredientCategory.map((item) => {
                return <option value={item.name}>{item.name}</option>
              })}
            </select>
            <select
              className="select-item"
              defaultValue={FkData.setCgSituation}
              onChange={(e) => {
                setCategorySt(e.target.value)
              }}
            >
              <option value="none">{situationCategoryTitle}</option>
              {situationCategory.map((item) => {
                return <option value={item.name}>{item.name}</option>
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
                        onChange={(e) =>
                          handleStepChange(index, 'imgUrl', e.target.files[0])
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

export default ModifyRecipe
