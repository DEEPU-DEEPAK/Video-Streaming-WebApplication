import { Navigate, Route,Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import HomePage from "./pages/home/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Footer from "./components/Footer"
import WatchPage from "./pages/Watchpage"
import SearchPage from "./pages/SearchPage"
import SearchHistoryPage from "./pages/SearchHistoryPage"
import NotFoundPage from "./pages/NotFoundPage"



function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();  
  console.log("auth user is here", user);

  useEffect(() => {
    authCheck();
  },[authCheck]);

  if(isCheckingAuth){ 
    return(
      <div className="h-screen">
        <div className="flex justify-center items-center h-full bg-black">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to={"/"}/> } />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"}/> } />    
      <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"}/> } />    
      <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"}/> } />
      <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
      <Route path='/*' element={<NotFoundPage />} />    
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
