import { useEffect, useState } from "react";
import useAuth from "./user-auth";
import { database } from "../library/firebase";
const useCurrentUser = () => {
  const [activeUser, setActiveUser] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const unsub = database
      .collection("users")
      .where("userId", "==", user.uid)
      .onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          setActiveUser({ ...doc.data(), docId: doc.id });
        });
      });

    return () => unsub();
  }, [user]);
  
  return { activeUser }
};
export default useCurrentUser;
