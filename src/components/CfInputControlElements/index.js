import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateAndSubmit } from "../../stores/app";
import { setValue } from "../../stores/input";
import * as inputControl from "../../stores/inputControl";

import RadioContainer from "./RadioContainer";
import CheckBoxContainer from "./CheckBoxContainer";

export default function CfInputControlElements(props) {
  const { type, value } = props;
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    dispatch(inputControl.setValue(value));
    if (value.length > 0) {
      dispatch(validateAndSubmit());
    }
  };

  const handleCheckboxChange = (value) => {
    dispatch(inputControl.setValue(value));
  };

  return (
    <div className="cf-input-control-elements hide-nav-buttons one-row resized">
      <div className="cf-list-button prev"></div>
      <div className="cf-list-button next"></div>
      {type === "multi" ? (
        <RadioContainer
          handleInputChange={handleInputChange}
        />
      ) : null}
      {type === "checkbox" ? (
        <CheckBoxContainer
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          value={value}
        />
      ) : null}
    </div>
  );
}
