import {DesmosObject} from "../types/types"
import {useRef, useEffect} from "react"
var Desmos = require("desmos")

interface Props { 
    desmos: string | null
}
const DesmosView = (props:Props) => {

    const ref = useRef<HTMLDivElement|null>(null)

    useEffect((()=>{
        console.log(props.desmos)
        const calculator = Desmos.GraphingCalculator(ref.current);
        calculator.setExpression({ id: 'graph1', latex: `f(x) = Graph-here!` });
        return() => {
            calculator.destroy();
        };
    }),[])
    return (
        <div ref={ref} style={{ height: '300px', width: '100%' }}>
        </div>
    )
}

export default DesmosView