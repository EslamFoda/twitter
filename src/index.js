import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from './context/firebase';
import {database, FieldValue ,auth} from './library/firebase'
ReactDOM.render(
  <FirebaseContext.Provider value={{ database, FieldValue, auth }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
