import React from "react";
import Header from "./header";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/users";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [user = null, setUser] = React.useState(null);
  const [loading, setloading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fecthUser = async () => {
    try {
      const token: any = Cookies.get("token");
      const response = await getCurrentUser(token);
      if (response.success) {
        setUser(response.data);
        console.log("User data:", response.data);
      } else {
        setError(response.message);
        console.error("Error fetching user data:", response.message);
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    }
  };

  React.useEffect(() => {
    fecthUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <Header
        user={user}
        
       />
      {children}
    </div>
  );
}
export default PrivateLayout;
