import React, { useState } from 'react';
import './App.css'; 

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState(''); 
  const [previousValue, setPreviousValue] = useState(''); 
  const [operator, setOperator] = useState(null); 

  
  const handleClick = (value) => {
    if (value === '%') {
      
      if (currentValue) {
        setCurrentValue((parseFloat(currentValue) / 100).toString());
      }
    } else if (value === '.') {
      
      if (!currentValue.includes('.')) {
        setCurrentValue(currentValue + value);
      }
    } else {
      setCurrentValue(currentValue + value);
    }
  };

  
  const handleOperatorClick = (operator) => {
    setOperator(operator);
    setPreviousValue(currentValue);
    setCurrentValue('');
  };

  
  const handleEqualClick = () => {
    if (previousValue && operator && currentValue) {
      const a = parseFloat(previousValue);
      const b = parseFloat(currentValue);
      let result;

     
      if (operator === '/' && b === 0) {
        setCurrentValue('Error');
        return;
      }

      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
        default:
          break;
      }

      setCurrentValue(result.toString());
      setPreviousValue('');
      setOperator(null);
    }
  };

  

  
  const clear = () => {
    setCurrentValue('');
    setPreviousValue('');
    setOperator(null);
  };

  return (
    <div className="calculator">
      <div className="display">{currentValue || '0'}</div>
      <div className="buttons">
        
        <button className="button clear" onClick={clear}>C</button>
        <button className="button operation" onClick={() => handleOperatorClick('/')}>/</button>
        <button className="button operation" onClick={() => handleOperatorClick('*')}>*</button>
        <button className="button percent" onClick={() => handleClick('%')}>%</button>

        <button className="button number" onClick={() => handleClick('7')}>7</button>
        <button className="button number" onClick={() => handleClick('8')}>8</button>
        <button className="button number" onClick={() => handleClick('9')}>9</button>
        <button className="button operation" onClick={() => handleOperatorClick('-')}>-</button>

        <button className="button number" onClick={() => handleClick('4')}>4</button>
        <button className="button number" onClick={() => handleClick('5')}>5</button>
        <button className="button number" onClick={() => handleClick('6')}>6</button>
        <button className="button operation" onClick={() => handleOperatorClick('+')}>+</button>

        <button className="button number" onClick={() => handleClick('1')}>1</button>
        <button className="button number" onClick={() => handleClick('2')}>2</button>
        <button className="button number" onClick={() => handleClick('3')}>3</button>
        <button className="button equal" onClick={handleEqualClick}>=</button>

        <button className="button number zero" onClick={() => handleClick('0')}>0</button>
        <button className="button dot" onClick={() => handleClick('.')}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
