import axios from 'axios'

const GET_ALL = 'GET_ALL'

const defaultAbout = {
  abouts: []
}

export const getAbouts = abouts => ({type: GET_ALL, abouts})

export const allAbouts = () => async dispatch => {
  try {
    const res = await axios.get('/api/about')
    dispatch(getAbouts(res.data))
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultAbout, action) {
  switch (action.type) {
    case GET_ALL:
    console.log("HIT THUNK")
      return {...state, abouts: action.abouts}
    default:
      return state
  }
}
