import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateAndSubmit } from "../../stores/app";
import { setValue } from "../../stores/input";
import * as inputControl from "../../stores/inputControl";

import Radio from "./Radio";
import Checkbox from "./CheckBox";

export default function CfInputControlElements(props) {
  const { type, filterKey, value } = props;
  const { disabled, required, placeholder, options } = useSelector(
    (state) => state.inputControl
  );
  const { currentQuestion } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    dispatch(setValue(value));
    if (value.length > 0) {
      dispatch(validateAndSubmit());
    }
  };

  const handleCheckboxChange = (value) => {
    dispatch(inputControl.setValue(value));
  };

  return (
    <div className="cf-input-control-elements hide-nav-buttons one-row resized animate-in">
      <div className="cf-list-button prev"></div>
      <div className="cf-list-button next"></div>
      {type === "multi" ? (
        <Radio
          handleInputChange={handleInputChange}
          value={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          options={options}
        />
      ) : null}
      {type === "checkbox" ? (
        <Checkbox
          filterKey={filterKey}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          value={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          options={options}
        />
      ) : null}
    </div>
  );
}
