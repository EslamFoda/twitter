import "./RemoveModel.css";
import { useContext } from "react";
import DeleteModelContext from "../context/DeleteModelContext";
import { database } from "../library/firebase";
const RemoveModel = ({ isOpen,id}) => {
  const { setIsOpen } = useContext(DeleteModelContext);
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
              onClick={async() => {
              await database.collection('tweets').doc(id).delete()
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