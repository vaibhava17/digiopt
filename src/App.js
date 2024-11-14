import React, { useState, useEffect, useRef } from "react";
import DigitInput from "./components/DigitInput";
import "./App.css";

const lengthofopt = 6;

export function App(props) {
  const [optArr, setOptArr] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isExpired, setExpired] = useState(false);

  useEffect(() => {
    let newoptArr = [];

    for (let i = 0; i < lengthofopt; i++) {
      newoptArr.push({
        val: "",
        id: i + 1,
      });
    }

    setOptArr(newoptArr);
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setExpired(true);
    }

    return () => clearInterval(interval);
  });

  const resetTimer = () => {
    setOptArr(optArr.map((item) => ({ ...item, val: "" })));
    setTimer(30);
    setExpired(false);
    inputRefs.current[0].focus();
  };

  const inputRefs = useRef([]);

  const handleOptChange = (e, index) => {
    let newOtpVal = e.target.value;
    let itemId = e.target.id;

    if (newOtpVal.length > 1) return;
    let newOptMapping = optArr.map((item) => {
      if (item.id == itemId) {
        return {
          ...item,
          val: newOtpVal,
        };
      } else {
        return item;
      }
    });

    setOptArr(newOptMapping);

    if (newOtpVal && index < optArr.length - 1) {
      inputRefs?.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      optArr[i] && optArr[i - 1].val &&
      i > 0
    ) {
      inputRefs.current[i - 1].focus();
    } else if (
      (e.key === "Backspace" || e.key === "Delete") &&
      optArr[i] && optArr[i].val &&
      i > 0
    ) {
      inputRefs.current[i - 1].focus();
    }
  };
  return (
    <div className="App">
      <h1>ENTER OTP</h1>
      <div className="digitInput">
        {optArr.length > 0 &&
          optArr.map((item, i) => {
            return (
              <DigitInput
                value={item.val}
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => handleOptChange(e, i)}
                key={i}
                id={item.id}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            );
          })}
      </div>

      <div className="resendSection">
        <p>OTP Expires in: {timer} seconds</p>
        <button
          disabled={!isExpired}
          onClick={() => {
            alert("OTP sent!");
            resetTimer();
          }}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default App;
