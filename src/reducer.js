export const reducer = (state, action) => {
 if (action.type === 'INITIAL_QUERY') {
  return {
   ...state,
   photos: action.payload
  }
 }
 if (action.type === 'SET_PAGE_TO_ONE') {
  return {
   ...state,
   page: 1
  }
 }
   if (action.type === 'SET_QUERY') {
     return {
       ...state,
       query: action.payload,
     }
   }
  if (action.type === 'START_LOADING') {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === 'STOP_LOADING') {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === 'QUERY_PHOTOS') {
   return {
    ...state,
    photos: action.payload
   }
  }
    if (action.type === 'DEFAULT_PHOTOS') {
      return {
        ...state,
        photos: action.payload
      }
    }
  if (action.type === 'LOAD_MORE_PHOTOS') {
   const addPage = (currPage) => currPage + 1
    return {
      ...state,
      page: addPage(state.page),
    }
  }
 
    throw new Error('no matching action type found')
}
