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
  const result = await database.collection('users').where('userId','==',id).get()
  return result.docs.map((user) => user.data());
}