import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [scientificMode, setScientificMode] = useState(false);

  // Handle keyboard input
  const handleKeyPress = (event) => {
    const { key } = event;
    if (!isNaN(key) || '+-*/().'.includes(key)) {
      handleInput(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'c' || key === 'C') {
      clear();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleInput = (input) => {
    setDisplay((prev) => prev + input);
  };

  const clear = () => {
    setDisplay('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      if (display.includes('/0')) {
        setDisplay('Error: Division by 0');
        return;
      }

      // Replace scientific functions and calculate correctly
      const result = eval(
        display
          .replace(/sin\((.*?)\)/g, (_, angle) => `Math.sin(${toRadians(angle)})`)
          .replace(/cos\((.*?)\)/g, (_, angle) => `Math.cos(${toRadians(angle)})`)
          .replace(/tan\((.*?)\)/g, (_, angle) => `Math.tan(${toRadians(angle)})`)
          .replace(/√\((.*?)\)/g, (_, number) => `Math.sqrt(${number})`)
      );
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const toggleScientificMode = () => {
    setScientificMode(!scientificMode);
  };

  const handleScientificFunction = (func) => {
    setDisplay((prev) => `${prev}${func}(`);
  };

  const toRadians = (angle) => {
    return (parseFloat(angle) * Math.PI) / 180;
  };

  return (
    <div className="calculator">
      <div className="display">{display || '0'}</div>
      <div className="buttons">
        <button onClick={clear} className="clear">C</button>
        <button onClick={handleBackspace} className="backspace">DEL</button>
        <button onClick={() => handleInput('%')} className="percent">%</button>
        <button onClick={() => handleInput('/')} className="operation">÷</button>
        {scientificMode && (
          <>
            <button onClick={() => handleScientificFunction('sin')} className="operation">sin</button>
            <button onClick={() => handleScientificFunction('cos')} className="operation">cos</button>
            <button onClick={() => handleScientificFunction('tan')} className="operation">tan</button>
            <button onClick={() => handleScientificFunction('√')} className="operation">√</button>
          </>
        )}
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('*')} className="operation">×</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')} className="operation">−</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('+')} className="operation">+</button>
        <button onClick={() => handleInput('0')} className="zero">0</button>
        <button onClick={() => handleInput('.')} className="dot">.</button>
        <button onClick={calculate} className="equal">=</button>
        <button onClick={() => handleInput(')')} className="parenthesis">)</button> {/* Закрывающая скобка */}
      </div>
      <button onClick={toggleScientificMode} className="toggle-mode">
        {scientificMode ? 'Basic Mode' : 'Scientific Mode'}
      </button>
    </div>
  );
}

export default App;
