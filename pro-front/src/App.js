import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './component/Nav/Nav';
import FormHome from './pages/form-home/FormHome';
import PrivateRoute from './component/PrivateRoute';
import Login from './pages/login/Login';
import AddProduct from './pages/add-product/AddProduct';
import Home from './pages/home/Home';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={500} hideProgressBar={true} />

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            {/* <Route path="/update" element={<h1>Update</h1>} /> */}
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<FormHome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
