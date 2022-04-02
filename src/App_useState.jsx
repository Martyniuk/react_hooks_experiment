import { useState } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 250px;
  height: 400px;
  border: 1px solid black;
  box-shadow: 0 0 12px 10px #cecece;
  background-color: ${({r, g, b}) => `rgb(${r}, ${g}, ${b})`};
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`

const TabsContainer = styled.div`
  width: 250px;
  height: 400px;
  display: grid;
  gap: 20px;
  border: 1px solid black;
`

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 300px;
  place-items: center;
  justify-content: center;
`

const ColorUpdaterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

function ColorUpdater({value, updateColor, color}) {
  return (
    <ColorUpdaterWrapper>
      <button onClick={() => updateColor(color, -5)}>-</button>
      <p>{value}</p>
      <button onClick={() => updateColor(color, 5)}>+</button>
    </ColorUpdaterWrapper>
  )
}

function App() {
  const [color, setColor] = useState({ r: 240, g: 0, b:0 })
  const {r, g, b} = color;

  // increment -> validation > 255
  // decrement -> validation < 0
  function isValid(c, value) {
   const v = color[c] + value;
   return !(v > 255 || v < 0)
  }

  function handleUpdateColor(color, value) {
   if (!isValid(color, value)) {
     return;
    }
    setColor(prevState => ({...prevState, [color]: prevState[color] + value}))
  }

  return (
    <Container>
      <Box r={r} g={g} b={b}>
        <p>rbg: {r} {g} {b}</p>
      </Box>
      <TabsContainer>
        <ColorUpdater color='r' value={r} updateColor={handleUpdateColor} />
        <ColorUpdater color='g' value={g} updateColor={handleUpdateColor} />
        <ColorUpdater color='b' value={b} updateColor={handleUpdateColor} />
      </TabsContainer>
    </Container>
  )
}

export default App