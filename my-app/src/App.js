import './App.css';
import React, {useRef, useEffect} from 'react';
import Desmos from 'desmos';
import './App.css';

function App() {
  //Integrals
  //integral_0^1 sqrt(x^2 - 2 x + 1)dx
  const graphContainerRef = useRef(null);
  const graphContainerRef2 = useRef(null);
  useEffect(()=> {
    const calculator = Desmos.GraphingCalculator(graphContainerRef.current);
    calculator.setExpression({ id: 'graph1', latex: '\\sqrt{x^2 - 2 x + 1}' });
    calculator.setExpression({
      id: 'inequality1',
      latex: '0\\le y\\le \\sqrt{x^2 - 2 x + 1} \\left\\{0\\le x\\le 1\\right\\} ',
      color: 'green',
      style: 'fill',
      hidden: false
    });
    calculator.setExpression({
      id: 'inequality2',
      latex: '0\\ge y\\ge \\sqrt{x^2 - 2 x + 1} \\left\\{0\\le x\\le 1\\right\\} ',
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
    <h1>Thomas is Joel's Bitch</h1>
      <div ref={graphContainerRef} style={{ height: '300px', width: '100%' }}/>
    <h1>GRACESONG</h1>
      <div ref={graphContainerRef2} style={{ height: '300px', width: '100%' }}/>
    </div>
  );
}

export default App;