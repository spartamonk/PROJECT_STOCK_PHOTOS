import React, { useReducer, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
import { reducer } from './reducer'
const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
const initialState = {
  isLoading: false,
  photos: [],
  page: 1,
  query: '',
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)


  const fetchPhotos = async() => {
    dispatch({ type: 'START_LOADING' })
    let url;
const pageUrl = `&page=${state.page}`
const queryUrl = `&query=${state.query}`
if(state.query) {
  url = `${searchUrl}${clientId}${pageUrl}${queryUrl}`
} else {
  url = `${mainUrl}${clientId}${pageUrl}`
}
    try {
      const response = await fetch(url)
      const data = await response.json()
      if(state.query && state.page === 1) {
        dispatch({type: 'INITIAL_QUERY', payload: data.results})
      }
      else if(state.query) {
        dispatch({
          type: 'QUERY_PHOTOS',
          payload: [...state.photos, ...data.results]
        })
      }
      else {
        dispatch({
          type: 'DEFAULT_PHOTOS',
          payload: [...state.photos, ...data],
        })
      }
      dispatch({ type: 'STOP_LOADING' })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'STOP_LOADING' })
    }
  }

  useEffect(() => {
    fetchPhotos()
    // eslint-disable-next-line
  }, [state.page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !state.isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        dispatch({ type: 'LOAD_MORE_PHOTOS' })
      }
    })
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({type:'SET_PAGE_TO_ONE'})
    fetchPhotos()
  }
  const handleInput =e=> {
    dispatch({type: 'SET_QUERY', payload:e.target.value})
  }
  return (
    <main>
      <section className='search'>
        <form action='' className='search-form' onSubmit={handleSubmit}>
          <input type='text' className='form-input' placeholder='search' value={state.query} onChange={handleInput} />
          <button className='submit-btn' type='submit'>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {state.photos.map((photo, index) => {
            return <Photo key={index} {...photo} />
          })}
        </div>
        {state.isLoading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  )
}

export default App
