// import { useStore, LikedState } from '../../components/store/store'

// const useToggleLikes = (recipeId: string) => {
//   const likedStore = useLikedStore()

//   const handleDeleteLike = async () => {
//     const { likedRecipes, toggleLikedRecipe } = likedStore
//     const oldData = likedRecipes.slice() // Copy the likedRecipes array

//     // Optimistically update to the new value
//     toggleLikedRecipe(recipeId)

//     // Define a rollback function
//     const rollback = () => {
//       // Revert to the previous state
//       likedStore.toggleLikedRecipe(recipeId)
//     }

//     try {
//       // Simulate an asynchronous deletion process here
//       // For instance, await deleteLike(recipeId);
//       // If successful, do nothing as the optimistic update already reflected the change
//     } catch (error) {
//       // If an error occurs, rollback to the previous state
//       rollback()
//       console.error(error)
//     } finally {
//       // Invalidate queries or perform any other necessary actions after deletion
//       // queryClient.invalidateQueries(['like']);
//     }
//   }

//   return { handleDeleteLike }
// }

// export default useToggleLikes
