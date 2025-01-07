import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './pages/error.jsx'
import MusicPlayer from './pages/musicplayer.jsx'
import Test from './pages/test.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/musicplayer",
        element: <MusicPlayer />,
        errorElement: <ErrorPage />
    },
    {
        path: "/test",
        element: <Test />,
        errorElement: <ErrorPage />
    }
])

export default router