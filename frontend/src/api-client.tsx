

import type { SignInFormData } from "./pages/Login";
import type { RegisterFormData } from "./pages/Register";

const API_URL="https://assignment-back-gqny.onrender.com"

export const handleRegister=async(formData:RegisterFormData)=>{
    try{
    const response=await fetch(`${API_URL}/api/user/register`,{
            method:"POST",
            credentials:"include",
           headers:{
            "Content-Type":"application/json"
           },
            body:JSON.stringify(formData)
        });
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return await response.json();

}catch(error){
   throw new Error("Something went wrong");
}
}

export const handleLogin=async(formData:SignInFormData)=>{
    const response=await fetch(`${API_URL}/api/user/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
    });

    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return await response.json();
}

export const me=async()=>{
     const response=await fetch(`${API_URL}/api/user/me`,{
        credentials:"include",
        method:"GET"
     });
     if(!response.ok){
        throw new Error("Something went wrong");
     }
     return response.json();
}

export type Task = {
    _id:string;
    title:string;
    description?: string;
}

export const logout=async()=>{
         const response=await fetch(`${API_URL}/api/user/logout`,{
            method:"POST",
            credentials:"include"
         });
         console.log(response)
        
}

export const verifyToken=async()=>{
    const response=await fetch(`${API_URL}/api/user/validate_token/`,{
        method:"GET",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Something went wrong");
    }
  
    return response.json();
}

export const showTask=async():Promise<Task[]>=>{
    const response=await fetch(`${API_URL}/api/task/`,{
        method:"GET",
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    const data:Task[] = await response.json();
    
    return data;
}
 
export type Blog={
    title:string,
    description:string,
}

export const createBlog=async(data:Blog)=>{
    const response=await fetch(`${API_URL}/api/task/createTask`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    });
    if(!response.ok){
        throw new Error("Something went wrong");
    }

    return await response.json();

}

export const userBlogs=async()=>{
     const response=await fetch(`${API_URL}/api/task/userBlog`,{
        method:"GET",
        credentials:"include"
     }      
     )
     if(!response.ok){
        throw new Error("Something went wrong");
     }
    const data=await response.json();
    return data;
}

export const deleteBlog=async(id:string)=>{
       const response=await fetch(`${API_URL}/api/task/${id}`,{
          method:"DELETE",
          credentials:"include"
       });
       if(!response.ok){
        throw new Error("Something went wrong");
       }
       return response.json();
}
export const getBlog=async(id:string)=>{
    const response=await fetch(`${API_URL}/api/task/${id}`,{
        method:"GET",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return response.json();
}

export const editBlog=async(id:string,data:Blog)=>{
    
    const response=await fetch(`${API_URL}/api/task/${id}`,{
        method:"PUT",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return response.json();
}

