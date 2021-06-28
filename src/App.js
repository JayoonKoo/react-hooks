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

const useConfirm = (message = "", onConfirm, onCancel) => {
	if (!onConfirm || typeof onConfirm !== "function") return;
	if (onCancel && typeof onCancel !== "function") return;

	const confirmAction = () => {
		// 브라우저의 confirm 함
		if (window.confirm(message)) {
			onConfirm();
		} else {
			onCancel();
		}
	}

	return confirmAction;
}

const AppConfirm = () => {
	const deleteWorld = () => console.log("delete all world!");
	const abort = () => console.log("abort");
	const confirmDelete = useConfirm("are you sure?", deleteWorld, abort);
	return (
		<div>
			<h1>Hello</h1>
			<button onClick={confirmDelete}>Delete World!</button>
		</div>
	)
}

const usePreventLeave = () => {
	const listener = (event) => {
		event.preventDefault();
		event.returnValue = "";
	}
	const enablePrevent = () => window.addEventListener("beforeunload", listener);
	const disablePrevent = () => window.removeEventListener("beforeunload", listener);

	return { enablePrevent, disablePrevent };
}

const AppPrevent = () => {
	const { enablePrevent, disablePrevent } = usePreventLeave();
	return (
		<div>
			<h1>Hello</h1>
			<button onClick={enablePrevent}>protect</button>
			<button onClick={disablePrevent}>unProtect</button>
		</div>
	)
}

const useBeforeLeave = (onBefore) => {

	const handler = event => {
		const { clientY } = event;
		if (clientY <= 0) onBefore();
	}

	useEffect(() => {
		document.addEventListener("mouseleave", handler);
		return () => {
			document.removeEventListener("mouseleave", handler);
		}
	}, []);
}

const AppBefore = () => {
	const onBefore = () => {console.log("pls don't go")};
	useBeforeLeave(onBefore);
	return (
		<div>
			<h1>Hello</h1>
		</div>
	)
};

const useFadeIn = () => {
	const element = useRef();
	useEffect(() => {
		if (element.current) {
			const { current } = element;
			current.style.transition = 'opacity 3s';
			current.style.opacity = 1;
		}
	}, []);
	return {ref: element, style:{opacity:"0"}};
}

const AppFadeIn = () => {
	const fadeInH1 = useFadeIn();
	return (
		<div>
			<h1 {...fadeInH1}>Hello</h1>
		</div>
	)
};
export default AppFadeIn;
