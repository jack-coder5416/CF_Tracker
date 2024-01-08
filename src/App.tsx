import { RouterProvider } from "react-router-dom"
import { router } from "./config/routes/routes"
import { UserContextProvider } from "./services/user-context-services"

function App() {


  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

export default App
