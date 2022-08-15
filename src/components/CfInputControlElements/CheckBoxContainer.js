import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckBox = (props) => {
  const [list, setList] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const {
    handleInputChange,
    value,
    handleCheckboxChange,
  } = props;
    const { options, checkboxSelect } = useSelector(
    (state) => state.inputControl
  );
  const [optionsList, setOptionsList] = useState(options);
  useEffect(() => {
    handleCheckboxChange(list.join(","));
  }, [list]);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      setOptionsList(
        options.filter((option) => {
          return option.toLowerCase().includes(value.toLowerCase());
        })
      );
    } else {
      setOptionsList(options);
    }
  }, [value]);

  useEffect(() => {
 if(checkboxSelect.length > 0){
  if (list.includes(optionsList[0])) {
    setList(list.filter((item) => item !== optionsList[0]));
  } else {
    setList([...list, optionsList[0]]);
  }
 }
  } , [checkboxSelect]);

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
        {isloading ? (
          <div className="cf-loader"></div>
        ) : (
          optionsList.map((option, i) => {
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
          })
        )}
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
