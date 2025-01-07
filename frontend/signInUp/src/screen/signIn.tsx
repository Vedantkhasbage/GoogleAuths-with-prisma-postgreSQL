// import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export const SignIn=()=>{
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
  
    const navigate=useNavigate();
    const handlesubmit2=async()=>{

        console.log("vedant")
          
 const response=await axios.post("http://localhost:3000/user/SignIn",{
          email:emailRef.current?.value,
          password:passwordRef.current?.value
     },{ withCredentials: true }) 
    navigate("/");
     console.log("ved")
     console.log(response);

    //  if(response.data.message!=="Invalid"){
    //     navigate("/");
    //     // alert("enter valid details!!!")
    //  } else{
    //     alert("enter valid details!!!")
    //  }



    }
  
    // const handlesubmit:any=useGoogleLogin({
    //   onSuccess:credentialResponse=>{
    //     const accessToken = credentialResponse.access_token;
          
    //     axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
    //                 headers:{
    //                     Authorization: `Bearer ${accessToken}`,  
    //                 }
    //              }).then((response)=>{
                  
    //             //   console.log(response);
                
    //               const email=response.data.email;

    //               axios.get("http://localhost:3000/user/finduser",{
    //                 params: {
    //                     email: email
    //                 }
    //               }).then((response)=>{
    //                 if(response.data.message==="found"){
    //                      alert("User already exist with this Email");
    //                      return;
    //                 }
    //               })

    //               axios.post("http://localhost:3000/user/GoogleSignUp",{
    //                 email:email,
    //                 googleID:response.data.sub
    //               }).then((response)=>{
    //                   console.log("already")
    //                 console.log(response);
    //                 console.log("already")
    //                 if(response.data.message==="signed up!!!"){
    //                    navigate("/")
    //                 }
    //               })
                  
    //             })
    //             }
    //             })
  
  
    return <div className="h-screen w-full flex justify-center items-center">
      <div className="h-2/3 border shadow-sm shadow-black w-[450px] rounded-2xl bg-white">
  
        <div className="w-full flex justify-center mt-4">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
        </div>
  
        <div className="h-full flex  justify-center mt-12">
          <div className=" h-2/3 flex flex-col justify-center">
            <h1 className="text-xl font-semibold mb-2">Email</h1>
            <div className="w-full flex justify-center"><input ref={emailRef} className="h-12 w-[400px] outline-none border-2 rounded mb-4" type="text" placeholder="Enter Your Email" /></div>
            <h1 className="text-xl mb-2 font-semibold">Password</h1>
            <div className="w-full flex justify-center"><input ref={passwordRef} className="h-12 w-[400px] outline-none border-2 rounded mb-4" type="text" placeholder="Enter Your password" /></div>
            <button onClick={handlesubmit2} className="h-12 text-white font-semibold mt-4 bg-blue-400">Sign Up</button>
           {/* <div className="h-12 w-full flex cursor-pointer border-black justify-center items-center border gap-2 mt-4">
            <img className="h-8 cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" alt="" />
             <h1 className="font-semibold">Continue with Google</h1>
           </div> */}
          </div>
  
        </div>
      </div>
    </div>
  }