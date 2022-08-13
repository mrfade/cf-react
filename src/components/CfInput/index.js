import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../../stores/input";

import CfInfo from "../CfInfo";
import CfInputControlElements from "../CfInputControlElements";
import CfSubmitButton from "../CfSubmitButton";

export default function CfInput() {
  const inputRef = useRef(null);

  const { value, disabled, required, placeholder, type } = useSelector(
    (state) => state.input
  );
  const { currentQuestion } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    dispatch(setValue(value));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentQuestion]);

  return (
    <div className="cf-input animate-in">
      <CfInfo />
      {type === "text" ? null : <CfInputControlElements />}

      <div className="inputWrapper">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          type="input"
          tabIndex={1}
          rows="1"
          placeholder={placeholder ?? "Write your answer"}
          style={{ height: "60px" }}
        ></textarea>

        <CfSubmitButton />
      </div>
    </div>
  );
}
