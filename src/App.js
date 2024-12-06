import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');

  
  const handleNumber = (num) => {
    setDisplay(prevDisplay => prevDisplay + num);
  };

  
  const clear = () => {
    setDisplay('');
  };

  
  const handleEqual = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  
  const handleSignChange = () => {
    setDisplay(prevDisplay => {
      if (prevDisplay.startsWith('-')) {
        return prevDisplay.slice(1); 
      } else {
        return '-' + prevDisplay; 
      }
    });
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  
  const handlePercent = () => {
    setDisplay(prevDisplay => (parseFloat(prevDisplay) / 100).toString());
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear" onClick={clear}>AC</button>
        <button className="percent" onClick={handlePercent}>%</button>
        <button className="operation" onClick={() => setDisplay(display + '/')}>/</button>
        <button className="operation" onClick={() => setDisplay(display + '*')}>*</button>
        <button className="number" onClick={() => handleNumber('7')}>7</button>
        <button className="number" onClick={() => handleNumber('8')}>8</button>
        <button className="number" onClick={() => handleNumber('9')}>9</button>
        <button className="operation" onClick={() => setDisplay(display + '-')}>-</button>
        <button className="number" onClick={() => handleNumber('4')}>4</button>
        <button className="number" onClick={() => handleNumber('5')}>5</button>
        <button className="number" onClick={() => handleNumber('6')}>6</button>
        <button className="operation" onClick={() => setDisplay(display + '+')}>+</button>
        <button className="number" onClick={() => handleNumber('1')}>1</button>
        <button className="number" onClick={() => handleNumber('2')}>2</button>
        <button className="number" onClick={() => handleNumber('3')}>3</button>
        <button className="equal" onClick={handleEqual}>=</button>
        <button className="zero" onClick={() => handleNumber('0')}>0</button>
        <button className="dot" onClick={() => setDisplay(display + '.')}>.</button>
        <button className="sign-change" onClick={handleSignChange}>+/-</button> 
        <button className="handleBackspace" onClick={handleBackspace}>DEL</button> 

      </div>
    </div>
  );
}

export default App;
