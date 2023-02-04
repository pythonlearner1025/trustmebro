import './App.css';
import React, {useRef, useState, useEffect} from 'react';
import Desmos from 'desmos';
import './App.css';



function App() {

  //Integrals
  //integral_0^1 sqrt(x^2 - 2 x + 1)dx
  const graphContainerRef = useRef(null);
  const graphContainerRef2 = useRef(null);

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          clearTimeout(timer);
          return timeLeft;
        }
        return timeLeft - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  
  useEffect(()=> {
    const calculator = Desmos.GraphingCalculator(graphContainerRef.current);
    calculator.setExpression({ id: 'graph1', latex: 'f(x) = input' });
    calculator.setExpression({ id: 'a-slider', latex: 'a=0' });
    calculator.setExpression({ id: 'b-slider', latex: 'b=0' });
    calculator.setExpression({
      id: 'inequality1',
      latex: '0\\le y\\le f(x) \\left\\{a\\le x\\le b\\right\\} ',
      color: 'green',
      style: 'fill',
      hidden: false
    });
    calculator.setExpression({
      id: 'inequality2',
      latex: '0\\ge y\\ge f(x) \\left\\{a\\le x\\le b\\right\\} ',
      color: 'green',
      style: 'fill',
      hidden: false
    });
    
    
    return() => {
      calculator.destroy();
    };
  }, []);
  
  //empty calc without values
  useEffect(()=> {
    const calculator2 = Desmos.GraphingCalculator(graphContainerRef2.current, {
      evaluate: false,
    });;

    return() => {
      calculator2.destroy();
    };
  }, []);

  return (
    <div className="App">
    <h1>Input the function you want to integrate to f(x) and use sliders a and b to choose your lower and upper bound</h1>
      <div ref={graphContainerRef} style={{ height: '300px', width: '100%' }}/>
    <h1>@graacesong</h1>
      <div ref={graphContainerRef2} style={{ height: '300px', width: '100%' }}/>
      <h1 className="timer">
        {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </h1>
    </div>
  );
}

export default App;