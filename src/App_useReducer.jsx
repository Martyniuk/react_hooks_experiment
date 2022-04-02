import { useReducer, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 300px 300px;
  place-content: center;
  gap: 20px;
  height: 100vh;
`;

const Box = styled.div`
  width: 250px;
  height: 400px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 12px 12px #cecece;
  background-color: ${({r, g, b}) => `rgb(${r}, ${g}, ${b})`};
  color: #fff;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
`;

const ColorsWrapper = styled.div`
  width: 250px;
  height: 400px;
  display: grid;
`

const ColorUpdaterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const initState = { r: 0, g: 0, b: 0 }
const actionType = {
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
}
const localStorageKey = 'localStorageKey4'

function colorsReducer(state, action) {
  switch (action.type) {
    case actionType.DECREMENT: {
      if (state[action.color] === 0) {
        return state;
      }

      return { ...state, [action.color]: state[action.color] - 1 }
    }
    case actionType.INCREMENT: {
      if (state[action.color] === 255) {
        return state;
      }

      return { ...state, [action.color]: state[action.color] + 1 }
    }
    default:
      throw new Error(`Usupporter action type: ${action.type}`)
  }
}

const ColorUpdater = ({ color, handleColorUpdate, value }) => (
  <ColorUpdaterWrapper>
    <button onClick={() => handleColorUpdate({ type: actionType.DECREMENT, color })}>-</button>
    <p>{value}</p>
    <button onClick={() => handleColorUpdate({ type: actionType.INCREMENT, color })}>+</button>
  </ColorUpdaterWrapper>
)

// a place for separate package or module/file --- start
function useLocalStorageState(key, defaultValue) {
  const [state, dispatch] = useReducer(colorsReducer, defaultValue, (initState) => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) {
      return JSON.parse(localStorageValue)
    }

    return typeof initState === 'function' ? initState() : initState
  })

  const prevKeyRef = useRef(key)
  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key

    window.localStorage.setItem(key, JSON.stringify(state))

  }, [state])

  return [state, dispatch]
}
// a place for separate package or module/file --- end


function App() {
  const [state, dispatch] = useLocalStorageState(localStorageKey, initState)
  const { r, g, b } = state

  return (
    <Container>
      <Box r={r} g={g} b={b}>
        <p>rgb: {r} {g} {b}</p>
      </Box>
      <ColorsWrapper>
        <ColorUpdater color='r' value={r} handleColorUpdate={dispatch} />
        <ColorUpdater color='g' value={g} handleColorUpdate={dispatch} />
        <ColorUpdater color='b' value={b} handleColorUpdate={dispatch} />
      </ColorsWrapper>
    </Container>
    )
}

export default App