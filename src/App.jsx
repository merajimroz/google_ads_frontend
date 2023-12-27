import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'
import router from './router';

import './App.css'
import './axiosConfig'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
      <RouterProvider router={router}>
        <CookiesProvider>

        </CookiesProvider>
      </RouterProvider>
  )
}

export default App
