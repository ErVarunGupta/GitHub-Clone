import '../auth/Auth.css';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const NewRepo = () => {
    const navigate = useNavigate();
  const formSubmitHandler = async (formData) => {
    const formInputData = Object.fromEntries(formData.entries());

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authorize!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      const url = "http://localhost:3000/repo/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData),
      });
      const data = await response.json();
      console.log(data);
      const {message, success} = data;
      if(success){
        alert(message);
        setTimeout(()=>{
            navigate('/dashboard')
        },1000)
      }
    } catch (error) {
      console.log("Error during repository creation: ", error);
    }
  };
  return (
    <>
        <Navbar/>
      <div className="container">
        <div>
          <h1>Create a new repository</h1>
        </div>
        <form action={formSubmitHandler} className="form-container">
          <div className="inner-container">
            <label htmlFor="name">Repository name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="inner-container">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
          </div>
          <div className="inner-container">
            <label htmlFor="content">Content</label>
            <input type="text" name="content" id="content" />
          </div>
          <div className="inner-container">
            <label htmlFor="visibility">Visibility</label>
            <input type="visibility" name="visibility" id="visibility" />
          </div>
          <button type="submit" className="form-btn">
            Create repositoy
          </button>
        </form>
      </div>
    </>
  );
};
