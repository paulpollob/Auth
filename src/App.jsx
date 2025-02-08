import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full'>
      <RouterProvider router={Router} />
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
    </div>
  )
}

export default App
