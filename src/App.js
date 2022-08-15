import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  start,
  setQuestions,
  _upHandler,
} from "./stores/app";

import ChatList from "./components/ChatList";
import CfInput from "./components/CfInput";
import { CfTitle } from "./components/CfTitle";
import { Loader } from "./components/Loader";

import "./styles/conversational-form.scss";

function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://e-solak.jotform.dev/intern-api/conversational-form/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setQuestions(data.content.questions));
      })
      .then(() => setLoading(false))
      .then(() => startConversation());
  }, []);
  const questionss = [
    {
      type: "text",
      label: "What is your name?",
      name: "name",
      placeholder: "Enter your name",
      required: true,
      validation: ["minLength:3", "required"],
    },
    {
      type: "robot-message",
      label: "Great!",
    },
    {
      type: "robot-message",
      label: "One more question",
    },
    {
      type: "email",
      label: "What is your email?",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      validation: ["email", "required"],
    },
    {
      type: "multi",
      label: "Do you want to subscribe to our newsletter?",
      name: "subscribe",
      placeholder: "Select an option or type your own",
      required: true,
      options: ["Yes, I want to subscribe", "No, I don't want to subscribe"],
      validation: ["required"],
    },
    {
      type: "checkbox",
      label: "Select one or more options",
      name: "checkbox",
      placeholder: "Select an option or type your own",
      required: true,
      options: ["PHP", "Javascript", "React.js"],
      validation: ["required"],
    },
  ];

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
            <CfTitle />
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
