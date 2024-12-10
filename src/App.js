import React, { useState } from 'react';

import { act } from 'react';

import './App.css';
import { evaluate } from 'mathjs'; 

function App() {
  const [display, setDisplay] = useState('');
  const [scientificMode, setScientificMode] = useState(false);
  const [isDegrees, setIsDegrees] = useState(true);

  const handleKeyPress = (event) => {
    const { key } = event;

    if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'c' || key === 'C') {
      clear();
    } else if (!isNaN(key) || '+-*/().'.includes(key)) {
      handleInput(key);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  
  const handleInput = (input) => {
    setDisplay((prev) => prev + input);
  };

  
  const clear = () => {
    setDisplay('');
  };


  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };


  const toRadians = (angle) => {
    if (isDegrees) {
      return (parseFloat(angle) * Math.PI) / 180;
    }
    return parseFloat(angle);
  };

  
  const handlePercent = (value) => {
    return value * 0.01;
  };


  const normalizeExpression = (expr) => {
    return expr.replace(/(\-{2,})/g, (match) => {
      return match.length % 2 === 0 ? '+' : '-';
    });
  };

  
  const calculate = () => {
    try {
      if (display.includes('/0')) {
        setDisplay('Error');
        return;
      }

      let formattedExpression = normalizeExpression(display);

      
      formattedExpression = formattedExpression
        .replace(/(\d+)%/g, (_, number) => `${handlePercent(number)}`)
        .replace(/sin\((.*?)\)/g, (_, angle) => `Math.sin(${toRadians(angle)})`)
        .replace(/cos\((.*?)\)/g, (_, angle) => `Math.cos(${toRadians(angle)})`)
        .replace(/tan\((.*?)\)/g, (_, angle) => `Math.tan(${toRadians(angle)})`)
        .replace(/√\((.*?)\)/g, (_, number) => `Math.sqrt(${number})`);

    
      const result = evaluate(formattedExpression);

      const roundedResult = roundToPrecision(result, 10);
      setDisplay(roundedResult.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const roundToPrecision = (value, precision) => {
    const scale = Math.pow(10, precision);
    return Math.round(value * scale) / scale;
  };

  const toggleScientificMode = () => {
    setScientificMode(!scientificMode);
  };

  const toggleDegreeRad = () => {
    setIsDegrees(!isDegrees);
  };

  const handleScientificFunction = (func) => {
    setDisplay((prev) => `${prev}${func}(`);
  };

  return (
    <div className="calculator">
      <div className="header">
        <div className="mode-controls">
          <span className="mode-toggle" onClick={toggleDegreeRad}>
            {isDegrees ? 'deg' : 'rad'}
          </span>
          <span className="scientific-mode-toggle" onClick={toggleScientificMode}>
            {scientificMode ? 'Scientific' : 'Basic'}
          </span>
        </div>
      </div>
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
        <button onClick={() => handleInput(')')} className="parenthesis">()</button>
      </div>
    </div>
  );
}

export default App;
