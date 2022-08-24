import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editAnswer } from "../../stores/answer";

export default function ChatResponse({ owner, thumb, messages }) {
  const { answers } = useSelector((state) => state.answer);
  const dispatch = useDispatch();

  const [val, setVal] = useState("");
  const [id, setId] = useState(answers.length - 1);

  const onFocus = (e) => {
    setVal(e.target.innerHTML);
  };
  const onBlur = (e) => {
    if (val !== e.target.innerHTML) {
      const html = e.target.innerHTML;
      setVal({ id: e.target.id, answer: html });
    }
  };

  useEffect(() => {
    dispatch(editAnswer(val));
  }, [val]);
  return (
    <div
      className={classNames("cf-chat-response", "show peak-thumb", "thinking", {
        user: owner === "user",
        robot: owner === "robot",
      })}
    >
      <div className="thumb" style={{ backgroundImage: `url(${thumb})` }}>
        <span></span>
      </div>
      <div className="text">
        {messages &&
          messages.map((message, index) => (
            <>
              <p
                contentEditable={owner === "user"}
                onFocus={onFocus}
                onBlur={onBlur}
                id={owner === "user" ? id : ""}
                dangerouslySetInnerHTML={{ __html: message }}
                className={
                  "show thinking " + (owner === "user" ? "editable" : "")
                }
              ></p>
            </>
          ))}
      </div>
    </div>
  );
}
