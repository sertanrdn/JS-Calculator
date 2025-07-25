import { useState } from 'react';
import Buttons from './components/Buttons';
import Display from './components/Display';
import { buttons } from './buttons.js';
import './App.css';

function App() {
  const [input, setInput] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = /[+\-*/]/;

  const handleClick = (val) => {
    if (val === "C") {
      setInput("0");
      setEvaluated(false);
    } else if (val === "=") {
      try {
        const result = eval(input.replace(/--/g, "+")).toString();
        setInput(result);
        setEvaluated(true);
      } catch {
        setInput("Error");
      }
    } else {
      if (evaluated) {
        if (isOperator.test(val)) {
          setInput(prev => prev + val);
        } else {
          setInput(val === "." ? "0." : val);
        }
        setEvaluated(false);
        return;
      }

      if (val === ".") {
        const lastNum = input.split(/[-+*/]/).pop();
        if (lastNum.includes(".")) return;
        setInput(prev => prev + ".");
      } else if (isOperator.test(val)) {
        if (isOperator.test(input.slice(-1))) {
          if (val === "-" && input.slice(-1) !== "-") {
            setInput(prev => prev + val);
          } else {
            setInput(prev => prev.replace(/[*+/-]+$/, "") + val);
          }
        } else {
          setInput(prev => prev + val);
        }
      } else {
        if (input === "0") {
          setInput(val);
        } else {
          setInput(prev => prev + val);
        }
      }
    }
  }

  return (
      <div className="calculator">
        <Display value={input} />
        <div className="buttons">
          {buttons.map(({ id, label }) => (
            <Buttons key={id} id={id} label={label} onClick={handleClick} />
          ))}
        </div>
      </div>
  );
}

export default App;
