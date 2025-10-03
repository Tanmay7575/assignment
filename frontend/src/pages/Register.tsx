import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client"
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";

export type RegisterFormData={
     name:string;
     email:string;
     password:string;
}

const Register = () => {
    const navigate=useNavigate();
    const {refetchToken}=useAppContext();

  const [formData,setFormData]=useState<RegisterFormData>({
      name:"",
      email:"",
      password:"",
  })

  const mutation=useMutation({
    mutationFn:apiClient.handleRegister,
    onSuccess:()=>{
      alert("user created suuccessfully");
      refetchToken();
       navigate("/");
    },
    onError:(error)=>{
      alert(error.message);
    }
  })
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    mutation.mutate(formData)
  }
  
  return (
    <div className="flex justify-center m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border rounded-lg w-80 shadow-lg"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
           disabled={mutation.isPending}
        >
           {mutation.isPending ? "Registering..." : "Register"} 
        </button>
      </form>
    </div>
  )
}

export default Register;