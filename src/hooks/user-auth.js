import { useEffect, useState } from "react";
import { auth } from "../library/firebase";
const useAuth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
      const unsub = auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          localStorage.setItem("user", JSON.stringify(userAuth));
          setUser(userAuth);
        } else {
          localStorage.removeItem("user");
          setUser(null);
        }
      });

      return () => unsub();
    }, []);

  
    return {user}
}
 
export default useAuth;