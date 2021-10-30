import "./RemoveModel.css";
import { useContext } from "react";
import DeleteModelContext from "../context/DeleteModelContext";
import { database,storage } from "../library/firebase";
import { useHistory } from "react-router-dom";
const RemoveModel = ({ isOpen, id, filePath }) => {
  const { setIsOpen } = useContext(DeleteModelContext);
  const history = useHistory()
  return (
    <>
      {isOpen && (
        <div className="delete_model_overlay">
          <div className="delete_model_container">
            <h2>Delete Tweet?</h2>
            <p style={{ color: "rgb(136, 153, 166)", margin: "1rem 0" }}>
              This can’t be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.
            </p>
            <button
              className="delete_tweet_btn"
              onClick={async () => {
                history.push("/home");
                if (filePath) {
                  const storageRef = storage.ref(filePath);
                  await storageRef.delete();
                }
                await database.collection("tweets").doc(id).delete();
                setIsOpen(false)
              }}
            >
              Delete
            </button>
            <button
              className="cancel_tweet_btn"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
 
export default RemoveModel;