import React, { useState, useEffect } from "react";

const CheckBox = (props) => {
  const [list, setList] = useState([]);
  const {
    handleInputChange,
    name,
    value,
    onChange,
    handleCheckboxChange,
    options,
  } = props;
  const [optionsList, setOptionsList] = useState(options);
  useEffect(() => {
    handleCheckboxChange(list.join(","));
  }, [list]);

  useEffect(() => {
   if (value.length > 0) {
    setOptionsList(
        options.filter((option) => {
            return option.toLowerCase().includes(value.toLowerCase());
        })
      );
    }
    else {
        setOptionsList(options);
    }
  }, [value]);

  const handleClick = (e) => {
    if (list.includes(e)) {
      setList(list.filter((item) => item !== e));
    } else {
      setList([...list, e]);
    }
  };
  const handleSubmit = () => {
    handleInputChange(list.join(","));
  };

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
        {optionsList.map((option, i) => {
          return (
            <div
              className={
                "cf-checkbox-button  cf-button animate-in" +
                (list.includes(option) ? " checked" : " unchecked")
              }
              onClick={(e) => {
                handleClick(option);
              }}
              tabindex={i}
            >
              <div>
                <div className="cf-checkbox"></div>
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="cf-button animate-in"
        style={{
          backgroundColor: "#303030",
          padding: "15px",
          color: "white",
          border: "none",
        }}
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
};
export default CheckBox;
