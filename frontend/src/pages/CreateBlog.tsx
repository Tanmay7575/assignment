import { useMutation } from "@tanstack/react-query"
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const {refetchToken}=useAppContext();
  const navigate=useNavigate();
  const [formdata,setFormData]=useState({
    title:"",
    description:""
  });

  const mutation=useMutation({
    mutationFn:apiClient.createBlog,
    onSuccess:()=>{
      alert("Blog created SuccessFully");
       refetchToken();
       navigate("/");
    }
  })
   const handleSubmit=(e:React.FormEvent)=>{
     e.preventDefault();
    mutation.mutate(formdata);
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create a New Blog Post</h2>
  <input 
    type="text" 
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
    placeholder="Title"
    value={formdata.title}
    onChange={(e) => setFormData({...formdata, title: e.target.value})}
  />
  <textarea 
    placeholder="Description"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y h-40 transition duration-300"
    value={formdata.description}
    onChange={(e) => setFormData({...formdata, description: e.target.value})}
  />
  <button 
    className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" 
    type="submit"
  >
    Submit
  </button>
</form>
  )
}

export default CreateBlog