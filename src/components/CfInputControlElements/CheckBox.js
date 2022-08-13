import React, { useState, useEffect } from "react";

const CheckBox = (props) => {
  const [list, setList] = useState([]);
  const { handleInputChange, name, value, onChange, handleCheckboxChange } =
    props;
  useEffect(() => {
    handleCheckboxChange(list.join(","));
  }, [list]);
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
        <div
          className={
            "cf-checkbox-button  cf-button animate-in" +
            (list.includes("PHP") ? " checked" : " unchecked")
          }
          onClick={(e) => {
            handleClick("PHP");
          }}
          tabindex="2"
        >
          <div>
            <div className="cf-checkbox"></div>
            <span>PHP</span>
          </div>
        </div>

        <div
          className={
            "cf-checkbox-button cf-button animate-in " +
            (list.includes("Javascript") ? " checked" : " unchecked")
          }
          onClick={(e) => {
            handleClick("Javascript");
          }}
          tabindex="3"
        >
          <div>
            <div className="cf-checkbox"></div>
            <span>Javascript</span>
          </div>
        </div>
        <div
          className={
            "cf-checkbox-button cf-button animate-in " +
            (list.includes("React.js") ? " checked" : " unchecked")
          }
          onClick={(e) => {
            handleClick("React.js");
          }}
          tabindex="3"
        >
          <div>
            <div className="cf-checkbox"></div>
            <span>React.js</span>
          </div>
        </div>
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
