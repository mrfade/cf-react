import React, { useState, useEffect, useRef } from "react";
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
  const { robotDelay } = useSelector((state) => state.app);
  const [optionsList, setOptionsList] = useState(options);

  const listRef = useRef(null);

  useEffect(() => {
    handleCheckboxChange(list.join(","));
  }, [list]);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, robotDelay);
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
        ref={listRef}
        className="cf-list"
        style={{
          height: isloading ? "0px" : listRef.current.scrollHeight,
          width: "100%",
          transform: "translateX(0px)",
          overflow: "hidden",
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
    </div>
  );
};
export default CheckBox;
