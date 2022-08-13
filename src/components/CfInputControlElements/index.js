import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateAndSubmit } from "../../stores/app";
import { setValue } from "../../stores/input";

export default function CfInputControlElements() {
  const inputRef = useRef(null);
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

  return (
    <div className="cf-input-control-elements hide-nav-buttons one-row resized animate-in">
      <div className="cf-list-button prev"></div>
      <div className="cf-list-button next"></div>
      <div
        className="cf-list"
        style={{
          height: "52px",
          width: "100%",
          transform: "translateX(0px)",
        }}
      >
        <div className="cf-radio-button cf-button animate-in" tabindex="2">
          <div
            onClick={(e) => {
              e.preventDefault();
              handleInputChange("Yes");
            }}
          >
            <div className="cf-radio"></div>
            <span>Yes</span>
          </div>
        </div>
        <div className="cf-radio-button cf-button animate-in" tabindex="3">
          <div
            onClick={(e) => {
              e.preventDefault();
              handleInputChange("No");
            }}
          >
            <div className="cf-radio"></div>
            <span>No</span>
          </div>
        </div>
      </div>
    </div>
  );
}
