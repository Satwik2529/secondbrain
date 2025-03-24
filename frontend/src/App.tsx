

import { Dashboard } from './pages/dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'

function App() {
   return <BrowserRouter>
   <Routes>
   <Route path="/" element={<Navigate to="/signup" />} />  
   <Route path="/signup" element={<Signup></Signup>}></Route>
   <Route path="/signin" element={<Signin></Signin>}></Route>
   <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
   </Routes>
   </BrowserRouter>
    
  
}
export default App
