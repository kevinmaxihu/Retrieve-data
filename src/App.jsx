import React from "react";
import "./App.css";
import { useState } from "react";
import { useRef } from "react";
const { GoogleSpreadsheet } = require("google-spreadsheet");

const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(
  /\n/g,
  "\n"
);
const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

function App() {
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState("");
  var formName = "";
  const FirstName = useRef(null);
  const LastName = useRef(null);

  const getColumn = async (user) => {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    console.log(doc.title);
  };

  const handleValidation = () => {
    let formIsValid = true;

    //FirstName

    if (!FirstName.current.value) {
      formIsValid = false;
      setErrors["FirstName"] = "Cannot be empty";
    }

    if (typeof FirstName.current.value !== "undefined") {
      if (!FirstName.current.value.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setErrors["FirstName"] = "Only letters";
      }
    }
    //LastName
    if (!LastName.current.value) {
      formIsValid = false;
      setErrors["LastName"] = "Cannot be empty";
    }

    if (typeof LastName.current.value !== "undefined") {
      if (!LastName.current.value.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setErrors["LastName"] = "Only letters";
      }
    }
    return formIsValid;
  };

  const handleSubmit = (e) => {
    if (!handleValidation()) {
      alert("Invalid Argument");
    } else {
      alert("Argument Valid");
      e.preventDefault();
      getColumn();
    }
  };

  return (
    <div className="center">
      <h1>Forgot your number ?</h1>
      <form>
        <div className="inputbox">
          <input
            ref={FirstName}
            type="text"
            onChange={(e) => setFistName(e.target.value)}
            required
          />
          <span>FirstName</span>
        </div>
        <div className="inputbox">
          <input
            ref={LastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <span>LastName</span>
        </div>
        <div className="inputbox">
          <input
            type="button"
            value="submit"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
