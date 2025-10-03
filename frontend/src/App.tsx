import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateBlog from "./pages/CreateBlog"
import MyBlogs from "./pages/MyBlogs"
import EditBlog from "./pages/EditBlog"

const App = () => {
   
     
  return (
    <div 
    className="flex flex-col min-h-screen overflow-x-hidden ">
    <Routes>
      <Route path="/" element={
        <Layout>
          <Home/>
        </Layout>
      }/>
    <Route path="/login" element={
      <Layout>
      <Login/>
      </Layout>
    }/>
    <Route path="/register" element={
      <Layout>
        <Register/>
      </Layout>
    }/>
    <Route path="/createBlog" element={
     <Layout>
      <CreateBlog/>
     </Layout> 
    }/>
    <Route path="/myBlogs" element={
      <Layout>
        <MyBlogs/>
      </Layout>
    } 
     />
     <Route path="/myBlogs/edit/:id" element={
      <Layout>
        <EditBlog/>
      </Layout>
     }/>
    
    </Routes>

    </div>
  )

}

export default App