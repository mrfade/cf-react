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
import { ErrorPage } from "./components/ErrorPage";

import "./styles/conversational-form.scss";

function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFormID(id));
    fetch(`https://e-solak.jotform.dev/intern-api/conversational-form/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        if (data.responseCode !== 200) {
          throw new Error('Could not get form');
        }

        dispatch(setQuestions(data.content.questions));
        setTitle(data.content.form_title);
      })
      .then(() => startConversation())
      .catch((error) => {
        console.log(error);

        setError(error.message);
      }).finally(() => setLoading(false))
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

  const _render = () => {
    if (!id) {
      return <ErrorPage message="Form ID is not provided" />
    }

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <ErrorPage message={error} />
    }

    return (
      <div className="conversational-form conversational-form--enable-animation conversational-form--show">
        <CfTitle title={title} />
        <div className="conversational-form-inner">
          <ChatList />
          <CfInput />
        </div>
      </div>
    );
  };

  return (
    <>
      {(_render())}
    </>
  );
}

export default App;
