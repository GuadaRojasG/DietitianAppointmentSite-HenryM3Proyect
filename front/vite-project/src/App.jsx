import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./views/Home/Home.jsx"
import Login from "./views/Login/Login.jsx"
import MisTurnos from "./views/MisTurnos/MisTurnos.jsx"
import Register from "./views/Register/Register.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import { useContext, useEffect } from "react"
import NotFound from "./components/NotFound/NotFound.jsx"
import { UsersContext } from "./context/UsersContext.jsx"
import AgendarTurnos from "./views/AgendarTurnos/AgendarTurnos.jsx"

function App() {

  const { isLogged } = useContext(UsersContext)

  const navigate = useNavigate()

  useEffect( () => {
    if (!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login")
    }
  }, [])

  return (
    <>
      {
        !isLogged ? (
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        ) : (
          <>
            <header>
              <Navbar />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/agendar-turnos" element={<AgendarTurnos />} />
                <Route path="/mis-turnos" element={<MisTurnos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )
      }
    </>
  )
}

export default App
