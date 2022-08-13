import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start, setQuestions, validateAndSubmit } from "./stores/app";

import ChatList from "./components/ChatList";
import CfInput from "./components/CfInput";
import { CfTitle } from "./components/CfTitle";

import "./styles/conversational-form.scss";

function App() {
  const questions = [
    {
      type: 'text',
      label: 'What is your name?',
      name: 'name',
      placeholder: 'Enter your name',
      required: true,
      validation: [
        'minLength:3',
        'required',
      ],
    },
    {
      type: 'robot-message',
      label: 'Great!',
    },
    {
      type: 'robot-message',
      label: 'One more question',
    },
    {
      type: 'email',
      label: 'What is your email?',
      name: 'email',
      placeholder: 'Enter your email',
      required: true,
      validation: [
        'email',
        'required',
      ]
    },
    {
      type: "multi",
      label: "Do you want to subscribe to our newsletter?",
      name: "subscribe",
      placeholder: "Select an option or type your own",
      required: true,
    },
    {
      type: "checkbox",
      label: "Select one or more options",
      name: "checkbox",
      placeholder: "Select an option or type your own",
      required: true,
    },
  ];

  const dispatch = useDispatch();
  dispatch(setQuestions(questions));

  const upHandler = ({ key, shiftKey }) => {
    if (key === "Enter" && !shiftKey) {
      dispatch(validateAndSubmit());
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

  useEffect(() => {
    startConversation();
  }, []);

  return (
    <div>
      <div className="conversational-form conversational-form--enable-animation conversational-form--show">
        <CfTitle />
        <div className="conversational-form-inner">
          <ChatList />
          <CfInput />
        </div>
      </div>
    </div>
  );
}

export default App;
