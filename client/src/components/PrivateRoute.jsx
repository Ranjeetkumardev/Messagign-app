import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useGetUserByIdQuery } from "../features/apiSlice";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const {data : userdata , isLoading , error  }  = useGetUserByIdQuery()
  const toastShown = useRef({ success: false, error: false }); // Track if toast has been shown
  console.log("logged in user data " ,userdata)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          console.log("logged in user data " ,userdata)
          if (!toastShown.current.success) { // Only show toast if not shown before
           // toast.success("User authenticated successfully.");
            toastShown.current.success = true;
          }
        }
      } catch (error) {
        setIsAuthenticated(false);

        if (!toastShown.current.error) { // Only show toast if not shown before
          toast.error("Please log in first.");
          toastShown.current.error = true;
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/register" />;
};

export default PrivateRoute;
