import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const ShowBlogs = () => {
  const navigate=useNavigate();
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchblogs"],
    queryFn: apiClient.showTask,
  });

  const {data:userData}=useQuery({
    queryKey:["findUser"],
    queryFn:apiClient.me
  });
   const role=userData?.role;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching blogs</p>;
  if (!blogs || blogs.length === 0) return <p>No blogs</p>;
  return (
    
    <div>
       <h1 className="text-3xl font-bold text-gray-800 mb-2 flex justify-center">
              Recent Blogs
            </h1>
      <div>
        {blogs.map((blog: any) => (
          

          <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200 mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {blog.title}
              
            </h1>
            <div className="flex items-center mb-4 text-sm text-gray-500">
              <span className="font-semibold mr-1">Written by:</span>
              <span className="text-gray-600" key={blog.id}>
                {blog.userId.name}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{blog.description}</p>
             {role === "admin" && <button
            onClick={() => navigate(`myBlogs/edit/${blog._id}`)}
            className="w-1/2 sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Edit
          </button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowBlogs;
