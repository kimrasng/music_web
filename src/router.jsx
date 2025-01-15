import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './pages/error.jsx'
import MusicPlayer from './pages/musicplayer.jsx'

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
    }
])

export default router