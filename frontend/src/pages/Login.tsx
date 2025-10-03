import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AuthContext";

 export type SignInFormData={
    role:string
    email:string;
    password:string;
}

const Login = () => {
  
    const {handleSubmit,register}=useForm<SignInFormData>({
      defaultValues:{role:"user"}
    });
    const navigate=useNavigate();
    const {refetchToken}=useAppContext();

    const mutation=useMutation({
        mutationFn:apiClient.handleLogin,
       onSuccess:()=>{
          alert("logged In Successfully");
          refetchToken();
          navigate("/");
       },
       onError:()=>{
         alert("false Credentials");
       }
    });
    const onSubmit=handleSubmit((data)=>{
         mutation.mutate(data);
    })
   

  return (
     <div className="flex justify-center m-10">
    <form action=""
    onSubmit={onSubmit}
     className="flex justify-center flex-col gap-4 p-6 border rounded-lg w-80 shadow-lg "
    >
        <h1 className="flex justify-center">Login</h1>
         <div className="flex justify-around">
          <label className="flex items-center gap-2">
            <input type="radio" value="user" {...register("role")} />
            User
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="admin" {...register("role")} />
            Admin
          </label>
        </div>
     <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          {...register("email",{required:"this field is required"})}
        />
    
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          {...register("password",{required:"this field is required"})}
        />
        <Link to="/register" className="underline flex justify-center">please register here..</Link>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
           disabled={mutation.isPending}
        >
           {mutation.isPending ? "Loging..." : "Login"} 
        </button>

    </form>
    </div>
  )
}

export default Login