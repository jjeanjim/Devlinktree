import {} from './App.css'
import { createBrowserRouter} from 'react-router-dom'
import { Home } from './Pages/home'
import { Admin } from './Pages/admin'
import { Login } from './Pages/login'
import { Networks } from './Pages/networks'
import { ErrorPage } from './Pages/error'


import { Private } from './routes/Private'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/admin",
    element:<Private><Admin/></Private>
  },
  {
    path:"/admin/social",
    element:<Private><Networks/></Private>
  },
  {
    path: "*",
    element: <ErrorPage/>
  },

])

export { router };
