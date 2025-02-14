import axios from "axios"
import RouterView from "./Routes"

axios.defaults.baseURL = 'http://127.0.0.1:8000'


function App() {

  return (
    <>
      <RouterView />
    </>
  )
}

export default App
