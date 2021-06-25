import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [item, setItem] = useState(1);
  const incresement = () => {
    setItem(item + 1);
  };
  const decresement = () => {
    setItem(item - 1);
  };
  return (
    <>
      <div>
        <h1>Item number is : {item}</h1>
      </div>
      <div>
        <button onClick={incresement}>Increse</button>
        <button onClick={decresement}>Decrese</button>
      </div>
    </>
  );
}

const useInput = (initValue, validator) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    let willUpdate = true;
		if (typeof validator === "function") {
			willUpdate = validator(value);
		}
		if (willUpdate) setValue(value);
  };

  return { value, onChange };
};

const AppInput = () => {
	const validator = (value) => !value.includes('@');
  const name = useInput("Mr.", validator);
  return (
    <div>
      <h1>Hello</h1>
      <input placeholder="name" {...name} />
    </div>
  );
};

export default AppInput;
