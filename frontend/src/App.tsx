import axios from "axios"
import RouterView from "./Routes"

// axios.defaults.baseURL = 'http://127.0.0.1:8000' rota para ambiente de desenvolvimento
export const URL = 'https://juliovieirap.pythonanywhere.com'
axios.defaults.baseURL = URL


function App() {

  return (
    <>
      <RouterView />
    </>
  )
}

export default App
