import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  start,
  setQuestions,
  _upHandler,
  setFormID
} from "./stores/app";

import ChatList from "./components/ChatList";
import CfInput from "./components/CfInput";
import { CfTitle } from "./components/CfTitle";
import { Loader } from "./components/Loader";

import "./styles/conversational-form.scss";

function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFormID(id));
    fetch(`https://e-solak.jotform.dev/intern-api/conversational-form/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setQuestions(data.content.questions));
        setTitle(data.content.form_title);
      })
      .then(() => setLoading(false))
      .then(() => startConversation());
  }, []);

  const upHandler = ({ key, shiftKey }) => {
    if (key === "Enter" && !shiftKey) {
      dispatch(_upHandler());
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", upHandler);

    return () => {
      window.removeEventListener("keypress", upHandler);
    };
  }, []);

  const startConversation = () => {
    dispatch(start());
  };

  return (
    <div>
      {id ? (
        loading ? (
         <Loader/>
        ) : (
          <div className="conversational-form conversational-form--enable-animation conversational-form--show">
            <CfTitle title={title} />
            <div className="conversational-form-inner">
              <ChatList />
              <CfInput />
            </div>
          </div>
        )
      ) : (
        <div>no id found</div>
      )}
    </div>
  );
}

export default App;
