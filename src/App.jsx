import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import "./App.css"
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <RouterProvider router={routes}>

    </RouterProvider>
  )
}

export default App