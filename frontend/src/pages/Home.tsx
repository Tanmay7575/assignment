import { useAppContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ShowBlogs from "../components/ShowBlogs";

const Home = () => {
  const { isLoggedIn } = useAppContext();
  const navigate=useNavigate();
  const handleCreate=()=>{
    if(isLoggedIn){
      navigate("/createBlog");
    }else{
      navigate("/login");
    }     
  }
  return (
    <div>
        <button onClick={handleCreate} className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out m-10">Create A New Blog</button>
        <ShowBlogs/>
    </div>
  );
};
export default Home;
