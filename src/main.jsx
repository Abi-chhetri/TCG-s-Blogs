import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { JwtTokenContextProvider } from './Context/JwtToken.jsx'
import { BlogContextProvider } from './Context/BlogContext'
import 'font-awesome/css/font-awesome.min.css';
import { LearningZoneContextProvider } from './Context/LearningZoneContext.jsx'
import { OtpContextProvider } from './Context/OtpContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <JwtTokenContextProvider>
      <UserContextProvider>
        <BlogContextProvider>
          <LearningZoneContextProvider>
            <OtpContextProvider>
              <App />
            </OtpContextProvider>
          </LearningZoneContextProvider>
        </BlogContextProvider>
      </UserContextProvider>
    </JwtTokenContextProvider>
  </BrowserRouter>,
)
