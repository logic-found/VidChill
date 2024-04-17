
import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
const Home = lazy(() => import('./pages/Home'))
const Watch = lazy(() => import('./pages/Watch'))
const Search = lazy(() => import('./pages/Search'))

function App() {

  return (
    <>
      <Suspense fallback={<></>}>
        <div className=''>


        <BrowserRouter>
          <div className='' >
            <Toaster position='top-center'
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#F5F2F2",
                },
                success: {
                  icon: "✅",
                },
                error: {
                  icon: "❌",
                },
              }}
            />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>


        </BrowserRouter>
        </div>

      </Suspense>
    </>
  )
}

export default App
