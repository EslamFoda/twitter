import { useEffect, useState } from "react";
import useAuth from "./user-auth";
import { database } from "../library/firebase";
const useCurrentUser = () => {
  const [userTweets, setUserTweets] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const unsub = database
      .collection("tweets")
      .where("userId", "==", user.uid)
      .onSnapshot((snap) => {
          const results = []
        snap.docs.forEach((doc) => {
         results.push({ ...doc.data(), docId: doc.id });
        });
        setUserTweets(results)
      });

    return () => unsub();
  }, [user]);

  return { userTweets };
};
export default useCurrentUser;
