import { database } from "../library/firebase";

export async function doesUserExist(username) {
  const result = await database
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function doesEmailExist(email) {
  const result = await database
    .collection("users")
    .where("email", "==", email)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

/** get active user from firestore */

export async function activeUser(id) {
  let loggedUser;
  let docId;
  const result = await database
    .collection("users")
    .where("userId", "==", id)
    .get();
  loggedUser = result.docs.map((user) => user.data());
  docId = result.docs.map((user) => user.id);
  return { loggedUser, docId };
}

export async function getSuggestedFollowers(id,following) {
  const result = await database
    .collection("users")
    .limit(5)
    .get();
  return result.docs
    .map((user) => ({...user.data(),docId:user.id}))
    .filter(profile=> profile.userId !== id && !following.includes(profile.userId))
}


/*****get logged in user tweets */

export async function getLoggedInUserTweets(id){
  let tweets = null
  const result = await database
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .where("userId", "==", id)
    .get();

   return tweets = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
}

/*** get following user tweets */
export async function getFollowingUsersTweets(following){
  let followingTweets;
  if(following.length > 0){
    const result = await database
      .collection("tweets")
      .orderBy("createdAt", "desc").where('userId','in',following).get()
      return followingTweets = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  } else {
    return followingTweets = []
  }
}


/******get tweets with comments */
export async function getTweetsWithComments(){
  let tweets = null;
  const result = await database
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .get();

  return (tweets = result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}

/*** get the tweets that the user likes it */


