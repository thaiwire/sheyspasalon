import React from "react";
import Header from "./header";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/users";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/error-message";
import { IUserGlobalStore } from "@/store/users-global-store";
import usersGlobalStore from "@/store/users-global-store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function PrivateLayout({ children }: { children: React.ReactNode }) {

  const {user, setUser} = usersGlobalStore() as IUserGlobalStore;

  
  const [loading, setloading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const router = useRouter();
  
  const fecthUser = async () => {
    setloading(true);
  //  console.log("loading",loading);
    try {
      const token: any = Cookies.get("token");

      if (!token) {
        setError("No token found");
        return;
      }
    //  console.log("Token:", token);

      const response = await getCurrentUser(token);
      if (response.success) {
           console.log("User data:", response.data);
        setUser(response.data);
    
      } else {
        setError(response.message);
        console.error("Error fetching user data:", response.message);
      }
    } catch (error: any) {
      Cookies.remove("token");
      toast.error("Session expired, please login again");
      console.error("Error fetching user data:", error);
      router.push("/login");
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  React.useEffect(() => {
    fecthUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen rounded">
        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <div>
      
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
}
export default PrivateLayout;
