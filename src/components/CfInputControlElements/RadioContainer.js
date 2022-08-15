import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Radio = (props) => {
  const { options } = useSelector((state) => state.inputControl);
  const [optionsList, setOptionsList] = useState(options);
  const { handleInputChange } = props;

  return (
    <div>
      <div
        className="cf-list"
        style={{
          height: "52px",
          width: "100%",
          transform: "translateX(0px)",
        }}
      >
        {optionsList.map((option, index) => {
          return (
            <div
              className="cf-radio-button cf-button animate-in "
              onClick={(e) => {
                e.preventDefault();
                handleInputChange(option);
              }}
              tabIndex={index}
            >
              <div>
                <div className="cf-radio"></div>
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
