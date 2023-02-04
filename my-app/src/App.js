import './App.css';
import React, {useRef, useEffect} from 'react';
import Desmos from 'desmos';
import './App.css';

function App() {
  //Integrals
  const graphContainerRef = useRef(null);
  const graphContainerRef2 = useRef(null);
  useEffect(()=> {
    const calculator = Desmos.GraphingCalculator(graphContainerRef.current);
    calculator.setExpression({ id: 'graph1', latex: 'y=x^3' });
    calculator.setExpression({
      id: 'inequality1',
      latex: '0\\le y\\le x^3 \\left\\{-2\\le x\\le 2\\right\\} ',
      color: 'green',
      style: 'fill',
      hidden: false
    });
    calculator.setExpression({
      id: 'inequality2',
      latex: '0\\ge y\\ge x^3 \\left\\{-2\\le x\\le 2\\right\\} ',
      color: 'green',
      style: 'fill',
      hidden: false
    });
    
    return() => {
      calculator.destroy();
    };
  }, []);
  
  //Differentiation
  useEffect(()=> {
    const calculator2 = Desmos.GraphingCalculator(graphContainerRef2.current);
    calculator2.setExpression({ id: 'graph2', latex: '1/4*x^2' });
    calculator2.setExpression({ id: 'slope', latex: 'y - \\frac{1}{4}(2)^2 = \\frac{d}{dx} \\left( \\frac{1}{4}x^2 \\right) + 2' });
    
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