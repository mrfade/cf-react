import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import input, { setValue } from "../../stores/input";

import CfInfo from "../CfInfo";
import CfInputControlElements from "../CfInputControlElements";
import CfSubmitButton from "../CfSubmitButton";

export default function CfInput() {
  const inputRef = useRef(null);

  const { value, disabled, required, placeholder, type, errorMessage, filterKey } = useSelector(
    (state) => state.input
  );
  const { currentQuestion } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    if (type == "tel") { //
      var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      let maskedValue =  !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      dispatch(setValue(maskedValue));
    }else {
      dispatch(setValue(value));
    }
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
      {!disabled && type !== "text" ? <CfInputControlElements value={value} filterKey={filterKey} type={type} /> : null}
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
