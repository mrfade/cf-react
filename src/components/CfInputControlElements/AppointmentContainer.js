import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setRobotThinking, addMessage } from "../../stores/chat";

const Appointment = (props) => {
  const { robotDelay, questions, currentQuestion } = useSelector(
    (state) => state.app
  );

  const { handleInputChange } = props;
  const listRef = useRef(null);
  const [isloading, setIsloading] = useState(true);
  const [question, setQuestion] = useState(questions[currentQuestion]);
  const [step, setStep] = useState(0);
  const [month, setMonth] = useState("");
  const [period, setPeriod] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const stepList = ["Month", "Period", "Day", "Time"];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    switch (step) {
      case 1:
        setMonth("");
        break;
      case 2:
        setPeriod("");
        break;
      case 3:
        setDay("");
        break;
      default:
        break;
    }
  };

  const handleMonthChange = (month) => {
    setMonth(month);
  };
  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  const handleDayChange = (day) => {
    setDay(day);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, robotDelay + 337.5);
  }, []);

  useEffect(() => {
    if (month.length > 0) {
      handleNext();
    }
  }, [month]);
  useEffect(() => {
    if (period.length > 0) {
      handleNext();
    }
  }, [period]);

  useEffect(() => {
    if (day.length > 0) {
      handleNext();
    }
  }, [day]);

  useEffect(() => {
    if (time.length > 0) {
      handleInputChange(day + " " + time);
    }
  }, [time]);

  return (
    <>
      <div
        style={{
          opacity: isloading ? "0" : "1",
          color: "#ffffff",
          fontSize: "16px",
          background: "#ff6100",
          maxWidth: "max-content",
          padding: "5px 10px",
          borderRadius: "15px 5px 15px 0px",
          marginBottom: "10px",
        }}
      >
        Please select a <b>{stepList[step]}</b>
      </div>

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
        {step > 0 ? (
          <div
            className="input-back-btn"
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}
          />
        ) : null}
        {step === 0 ? (
          <Options
            data={question.fieldOptions.availableTimeSlots}
            handleChange={handleMonthChange}
          />
        ) : step === 1 ? (
          <Options
            data={question.fieldOptions.availableTimeSlots[month]}
            handleChange={handlePeriodChange}
          />
        ) : step === 2 ? (
          <Options
            data={question.fieldOptions.availableTimeSlots[month][period]}
            handleChange={handleDayChange}
          />
        ) : step === 3 ? (
          <Options
            data={question.fieldOptions.availableTimeSlots[month][period][day]}
            handleChange={handleTimeChange}
          />
        ) : null}
      </div>
    </>
  );
};

export const Options = (props) => {
  const { data, handleChange } = props;

  const { robotDelay } = useSelector((state) => state.app);

  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, robotDelay + 337.5);
  }, [data]);

  return (
    <>
      {isloading ? (
        <div class="dot-loader">
          <div class="blue"></div>
          <div class="orange"></div>
          <div class="yellow"></div>
        </div>
      ) : (
        Object.keys(data).map((option, i) => {
          return (
            <div
              className="cf-radio-button cf-button animate-in "
              onClick={(e) => {
                e.preventDefault();
                handleChange(option);
              }}
              tabIndex={i}
            >
              <div>
                <div className="cf-radio"></div>
                <span>{option}</span>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Appointment;
