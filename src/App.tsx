import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import "./styles/global.scss"

const testContext = React.createContext('')

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/rooms/new" element={<NewRoom/>}  />
    </Routes>
    </BrowserRouter>
  )
}

export default App
