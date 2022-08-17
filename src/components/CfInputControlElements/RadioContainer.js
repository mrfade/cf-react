import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Radio = (props) => {
  const { handleInputChange } = props;

  const { robotDelay } = useSelector((state) => state.app);
  const { options } = useSelector((state) => state.inputControl);

  const [optionsList, setOptionsList] = useState(options);

  const [isloading, setIsloading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, robotDelay + 337.5);
  }, []);

  return (
    <div>
      <div
        ref={listRef}
        className="cf-list"
        style={{
          height: isloading ? "0px" : "auto",
          width: "100%",
          transform: "translateX(0px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
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
