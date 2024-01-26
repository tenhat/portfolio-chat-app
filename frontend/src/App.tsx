import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Chat } from './components/pages/Chat'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from './components/organisms/LoginForm'
import SignupForm from './components/organisms/SignupForm'
import AuthPage from './components/pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
