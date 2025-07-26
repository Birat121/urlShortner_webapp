import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layouts'
import Landing from './pages/Landing'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import Redirect from './pages/redirect'
import Link from './pages/link'

const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    children : [
      {
        path : '/',
        element : <Landing/>
      },
      {
        path : '/dashboard',
        element : <Dashboard/>
      },
      {
        path : '/:id',
        element : <Auth/>
      },
      {
        path : '/auth',
        element : <Redirect/>
      },
      {
        path : '/link/:id',
        element : <Link/>
      }
    ]
  }
])
function App() {
  

  return <RouterProvider router={router} />
}

export default App
