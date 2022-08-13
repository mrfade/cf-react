import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateAndSubmit } from "../../stores/app";
import { setValue } from "../../stores/input";
import Radio from "./Radio";
import Checkbox from "./CheckBox";

export default function CfInputControlElements(props) {
  const { type } = props;
  const { value, disabled, required, placeholder } = useSelector(
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
    dispatch(setValue(value));
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
        />
      ) : null}
      {type === "checkbox" ? (
        <Checkbox
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          value={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
        />
      ) : null}
    </div>
  );
}
