
import {useState} from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "", 
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try{
const res =await api.post("/auth/login", form);
console.log(res, "data");

// save token  to local storage 
localStorage.setItem("token", res.data.token)

setMsg("login successful")

// redirect to home page after 1 sec
setTimeout(()=>{
  navigate("/");
},1000)

    }
    catch(error){
      setMsg(error.response?.data?.message || "An error occured")
    }
}

return (
  <div className= "flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

{msg &&(
        <div className="mb-4 text-red-600 font-medium text-sm text-center">
          {msg}
        </div>
      )}

<form onSubmit={handleSubmit} className="space-y-4"> 
  <input type="email"
  name="email"
  placeholder="Enter Email"
  value={form.email}
  onChange={handleChange}
  className="w-full px-3 py2 border border-grey-300 rounded-md focus:outline-none"
  required
  />

  <input type="password" 
  name="password"
  placeholder="Enter Password"
  value={form.password}
  onChange={handleChange}
  className= "w-full px-3 py2 border border-grey-300 rounded-md focus:outline-none"
  required
  />

  <button type="submit"
  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" >
    Login
  </button>


  </form>

  
    </div>
  </div>

)

}