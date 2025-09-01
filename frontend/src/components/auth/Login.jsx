import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const formSubmitHandler = async(formData) =>{
        const formInputData = Object.fromEntries(formData.entries());
        console.log(formInputData);

        try {
            const url = "http://localhost:3000/users/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formInputData)
            })
            const data = await response.json();
            console.log(data);
            const {message, success, token} = data;
            if(success){
                localStorage.setItem("token", token);
                setTimeout(()=>{
                    navigate("/dashboard");
                }, 1000)
            }
        } catch (error) {
            console.log("Login failed: ", error.message);
        }
    }
  return (
    <div className="container">
      <div>
        <h1>Login</h1>
      </div>
      <form action={formSubmitHandler} className="form-container">
        <div className="inner-container">
          <label htmlFor="identifier">Username or Email</label>
          <input type="text" name="identifier" id="identifier" />
        </div>
        <div className="inner-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit" className="form-btn">Login</button>
      </form>
      <div className="is-account">
        <p>
          Don't have an account? <Link to="/signup">Signup now</Link>
        </p>
      </div>
    </div>
  );
};
