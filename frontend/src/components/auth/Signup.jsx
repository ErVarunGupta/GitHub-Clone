import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

export const Signup = () => {
    const navigate = useNavigate();
    const formSubmitHandler = async(formData) =>{
        const formInputData = Object.fromEntries(formData.entries());
        console.log(formInputData);

        try {
            const url = `${api_url}/users/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(formInputData)
            })

            const data = await response.json();
            console.log(data);

            const {message, success, token} = data;
            if(success){
                localStorage.setItem("token", token);
                setTimeout(()=>{
                    navigate("/dashboard")
                }, 1000)
            }

        } catch (error) {
            console.log("Signup failed: ", error.message);
        }
    }
  return (
    <div className="container">
      <div>
        <h1>Sign Up</h1>
      </div>
      <form action={formSubmitHandler} className="form-container">
        <div className="inner-container">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="inner-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className="inner-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit" className="form-btn">Sign Up</button>
      </form>
      <div className="is-account">
        <p>
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </div>
    </div>
  );
};
