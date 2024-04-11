import {
  Routes,
  Route,
  
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Layout from "./components/layout/Layout";
import CreateBlog from "./pages/blog/CreateBlog";
import BlogListing from "./pages/blog/BlogListing";
import BlogDetail from "./pages/blog/BlogDetails";


function App() {


  return (
  
   <Layout> 
     < ToastContainer/>
   <Routes>
   <Route  exact path={'/'} element={<CreateBlog />} />
   <Route  exact path={'/blogs'} element={<BlogListing />} />
   <Route  exact path={'/blog/:id'} element={<BlogDetail />} />
   </Routes>


   </Layout>
          
  )
}

export default App
