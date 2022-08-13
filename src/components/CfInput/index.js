import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { setValue } from "../../stores/input";

import CfInfo from "../CfInfo";
import CfInputControlElements from "../CfInputControlElements";
import CfSubmitButton from "../CfSubmitButton";

export default function CfInput() {
  const inputRef = useRef(null);

  const { value, disabled, required, placeholder, type, errorMessage } = useSelector(
    (state) => state.input
  );
  const { currentQuestion } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    dispatch(setValue(value));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentQuestion,errorMessage]);

  return (
    <div className={classNames('cf-input animate-in', {
      'error': errorMessage.length > 0,
      'disabled': errorMessage.length > 0
    })}>
      <CfInfo />
      {!disabled && type !== "text" ? <CfInputControlElements type={type} /> : null}
      <div className="inputWrapper">
        <input
          required={required}
          ref={inputRef}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          type="text"
          tabIndex={1}
          rows="1"
          placeholder={errorMessage.length > 0 ? errorMessage : (placeholder ?? "Write your answer")}
          style={{ height: "60px" }}
        ></input>

        <CfSubmitButton />
       </div>
    </div>
  );
}
