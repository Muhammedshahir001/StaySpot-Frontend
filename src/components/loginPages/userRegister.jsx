import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userregister } from "../../api/userApi";

const UserRegister = () => {
  const [message, setMessage] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const generateSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (name === "" || email === "" || phone === "" || password === "") {
      generateError("Please fill all the required fields");
    } else if (!strongPasswordRegex.test(password)) {
      generateError("Please enter a strong password");
    } else if (password !== repassword) {
      generateError("Passwords do not match. Please try again.");
    } else {
      try {
        const data = await userregister({
          name: name,
          email: email,
          phone: phone,
          password: password,
        });

        if (data && data.errors) {
          if (data.errors.email) {
            generateError(
              "Email is already taken. Please use a different email."
            );
          }
          if (data.errors.phone) {
            generateError(
              "Phone number is already taken. Please use a different phone number."
            );
          }
        } else {
          generateSuccess("Account activated, check your email");
        }
      } catch (error) {
        console.log("Error during registration:", error);
        generateError("Sorry the email or password is already taken please provide another one !!!");
      }
    }
  };

  return (
    <div className="h-screen flex">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div
        className="w-full bg-cover bg-center items-center"
        style={{
          backgroundImage:
            'url("https://www.backpackers.cloud/static/media/tryregister.274b8bf0.jpg")',
        }}
      >
        <div
          style={{ margin: "5vw 13vw" }}
          className="absolute flex flex-col md:w-3/4 py-12 md:flex-row items-center  bg-white bg-opacity-60 rounded-3xl"
        >
          <div className=" w-1/2 pl-24 rounded-lg">
            <h1 className="text-2xl font-bold text-blue-800 mb-7">SignUp</h1>
            <p>Please Enter Your SignUp Details</p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                className="h-10 max-w-sm text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={(e) => setname(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="text"
                name="phone_number"
                placeholder="Phone"
                onChange={(e) => setphone(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <input
                className="h-10 max-w-sm  text-blue-700 mt-1 bg-transparent border-[3px] border-blue-900 rounded-sm pl-5"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={(e) => setrepassword(e.target.value)}
              />
              <button
                className="h-10 max-w-sm mt-8 text-blue-950 font-extrabold text-lg border-[3px] border-blue-900 rounded-sm hover:text-white"
                type="submit"
              >
                SIGNUP
              </button>
              <div className="flex ">
                <p className=" me-4">Already a member..?</p>
                <p className="">
                  <Link className="text-blue-800" to="/login">
                    Login
                  </Link>
                </p>
              </div>
              {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
          </div>
          <div className=" w-1/2 register-image-full-container">
            <div className="travel-img-container">
              <img
                className="rounded-lg  md:ml-5  w-2/3"
                src={
                  "https://www.backpackers.cloud/static/media/man_walking.b7266244.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
