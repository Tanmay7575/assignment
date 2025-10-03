import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client"; 
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {data:blog}=useQuery({
    queryKey:["fetchBlog"],
    queryFn:()=>apiClient.getBlog(id!),
  })
   
  useEffect(()=>{
    if(blog){
      setTitle(blog.title);
      setDescription(blog.description)
    }
  },[blog])

  const mutation = useMutation({
    mutationFn: (updatedData: { title: string; description: string }) =>
      apiClient.editBlog(id!, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchblogs"] }); 
      navigate("/"); 
    },
    onError: (error: any) => {
      console.error("Update failed:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, description });
  };

 

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {mutation.isPending ? "Updating..." : "Update Blog"}
        </button>
      </form>
      {mutation.isError && (
        <p className="text-red-500 mt-2">Error updating blog.</p>
      )}
    </div>
  );
};

export default EditBlog;

