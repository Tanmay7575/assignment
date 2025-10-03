import { Link } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
       
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Blog WEB
          </Link>
        </div>

       
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center space-x-6">
              <Link to="/myBlogs" className="text-gray-200 hover:text-white transition-colors text-lg font-medium">
                My Blogs
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-200 hover:text-white transition-colors text-lg font-medium">
                Login
              </Link>
              <Link to="/register" className="text-gray-200 hover:text-white transition-colors text-lg font-medium">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
    // <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md"
    // >
    //   <h1 className="text-2xl font-bold">Blog WEBS</h1>
    //   <nav className="space-x-4 flex font-bold">
    //  {isLoggedIn ?(
    //   <div className="m-2 flex ">
    //       <Link to="/" className="hover:underline">Home</Link>
    //       <Link to="/myBlogs" className="border hover:bg-blue-400">MyBlogs</Link>
    //     
    //   </div>
        
    //  ):(
    //   <div>
    //       <Link to="/login" className="hover:underline">Login</Link>
    //     <Link to="/register" className="hover:underline">Register</Link>
    //   </div>
      
    //  )
    // }
     
     
    //   </nav>
    // </header>
  // );
// };

// export default Header;
