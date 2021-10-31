import './AddTweetModel.css'
import WhatsHappening from './WhatsHappening'
import { useContext } from "react";
import DeleteModelContext from "../context/DeleteModelContext";
const AddTweetModel = ({ tweetModel }) => {
  const { setTweetModel } = useContext(DeleteModelContext);
  return (
    <>
      {tweetModel && (
        <div>
          <div className="addtweet_model_overlay">
            <div className="addTweet_model_container">
              <div className="addtweet_model_header">
                <i
                  class="las la-times close_addmodel_btn"
                  onClick={() => setTweetModel(false)}
                ></i>
              </div>
              <WhatsHappening setTweetModel={setTweetModel} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTweetModel;
