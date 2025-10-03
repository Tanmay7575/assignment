import { useMutation } from "@tanstack/react-query"
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";

const SignOutButton = () => {
    const navigate=useNavigate();
    const {refetchToken}=useAppContext();
    const mutation=useMutation({
        mutationFn:apiClient.logout,
        onSuccess:()=>{
           refetchToken();
           navigate("/");
        },
        onError:()=>{
        }
        });
        const handleClick=()=>{
             mutation.mutate();
        }
        
  return (
<button
  className="
    px-4 py-2 
    text-white 
    bg-red-600 
    rounded-lg 
    font-medium 
    shadow-md
    hover:bg-red-700 
    hover:shadow-lg 
    focus:outline-none 
    focus:ring-2 
    focus:ring-red-500 
    focus:ring-opacity-50
    transition 
    duration-300
    cursor-pointer
  "
  onClick={handleClick}
>
  Logout
</button>
  )
}

export default SignOutButton