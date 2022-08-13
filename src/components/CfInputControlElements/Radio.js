import React from "react";

 const Radio = (props) => {

    const { handleInputChange, name, value, onChange, checked } = props;
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
          className="cf-radio-button cf-button animate-in "
          onClick={(e) => {
            e.preventDefault();
            handleInputChange("Yes");
          }}
          tabindex="2"
        >
          <div>
            <div className="cf-radio"></div>
            <span>Yes</span>
          </div>
        </div>
        <div
          className="cf-radio-button cf-button animate-in"
          onClick={(e) => {
            e.preventDefault();
            handleInputChange("Yes");
          }}
          tabindex="3"
        >
          <div>
            <div className="cf-radio"></div>
            <span>No</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;
