import { Route, Routes } from "react-router-dom"
import { SignIn } from "../screen/signIn"
import { SignUp } from "../screen/signup"
import { Home } from "../screen/home"

export const Routing=()=>{
    
    return <div>
        <Routes>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
}