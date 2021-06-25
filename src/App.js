import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";

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

const content = [
	{
		tab: "Section 1",
		content: "I'm the content of the Section 1"
	},
	{
		tab: "Section 2",
		content: "I'm the content of the Section 2"
	},
]

const useTabs = (initailValue, allTabs) => {
	const [currentIndex, setCurrentIndex] = useState(initailValue);
	if (!allTabs || !Array.isArray(allTabs)) {
		return;
	}
	return {
		currentItem: allTabs[currentIndex],
		changeItem: setCurrentIndex,
	};
}

const AppTab = () => {
	const {currentItem, changeItem} = useTabs(1, content);
	return (
		<>
		<div>
			{content.map((section, index) => <button onClick={() => changeItem(index) }>{section.tab}</button>)}
		</div>
		<div>
			{currentItem.content}
		</div>
		</>
	)
}

const useTitle = (initailTitle) => {
	const [title, setTitle] = useState(initailTitle);
	const updateTitle = () => {
		const currentTitle = document.querySelector("title");
		currentTitle.innerText = title;
	}
	useEffect(updateTitle, [title]);
	return setTitle;
}

const AppTitle = () => {
	const titleUpdater = useTitle("Loding...");
	setTimeout(() => titleUpdater("updated"), 3000);
	return (
		<div>
			Hello
		</div>
	)
}

const useClick = onClick => {
	const element = useRef();
	useEffect(() => {
		if (element.current) {
			element.current.addEventListener('click', onClick);
		}
		return () => {
			if (element.current) {
				element.current.removeEventListner('click', onClick);
			}
		}
	}, [])
	return element;
}

const AppClick = () => {
	const sayHello = () => console.log("say hello");
	const title = useClick(sayHello);
	return (
		<div>
			<h1 ref={title}>Title</h1>
		</div>
	)
}

export default AppClick;
