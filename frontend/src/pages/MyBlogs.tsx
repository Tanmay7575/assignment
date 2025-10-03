import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
    const queryClient=useQueryClient();
    const {data:blogs,isLoading,isError}=useQuery({
        queryKey:["fetchUserBlog"],
        queryFn:apiClient.userBlogs,
    })
    const navigate=useNavigate();
     
    const mutation=useMutation({
        mutationFn:(id: string)=>apiClient.deleteBlog(id),
    
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["fetchUserBlog"]})
          
           alert("Blog deleted successfully");
        },
        onError:()=>{
            alert("not deleted");
        }
    })
   
      if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching blogs</p>;
  return (
     <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
  {blogs.map((blog:any) => (
    <article 
      key={blog._id} 
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 transition-transform duration-200 transform hover:scale-105"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        {/* Blog Content */}
        <div className="flex-1 min-w-0 mb-4 sm:mb-0">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">
            @{blog.userId.name}
          </h2>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mb-2 truncate">
            {blog.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed truncate-2-lines">
            {blog.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() => mutation.mutate(blog._id)}
            className="w-1/2 sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`edit/${blog._id}`)}
            className="w-1/2 sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Edit
          </button>
        </div>
      </div>
    </article>
  ))}
</div>
  )
}

export default MyBlogs