import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes
import './App.css';
import { Signup } from './pages/Signup';  // Assuming you have a Signup component
import { Signin } from './pages/Signin';  // Assuming you have a Signin component
import { Blog } from './pages/Blog'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} /> {/* Added Signin route */}
          <Route path="/blog/:id" element ={<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
