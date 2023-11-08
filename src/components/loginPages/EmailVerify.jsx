import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userverify } from "../../api/userApi";

const EmailVerify = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // I getting the id by using useParams()
        const response = await userverify(id);
        // const response = await axios.post(`http://localhost:4001/verifyemail/${id}`);
        const { success, error } = response.data;
        console.log(response.data, "response of data");

        if (success) {
          // User verified successfully
          navigate("/login");
        } else {
          // Error occurred during verification
          console.log(error, "error in verifying");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [id, navigate]);

  return (
    <div>
      {isLoading ? (
        <h1>Verifying Email...</h1>
      ) : (
        <div>
          <h1>Email Verified!</h1>
          <p>Your email has been successfully verified.</p>
          <p>
            You can now proceed to the <Link to="/login">Login</Link> page.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
