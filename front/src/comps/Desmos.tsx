import {DesmosObject} from "../types/types"
import {useRef, useEffect} from "react"
interface Props { 
    desmos: DesmosObject
}
const Desmos = (props:Props) => {

    const desmosRef = useRef(null)
    useEffect((()=>{
        // set desmoseRef based on DesmosObject
    }), [])

    return (
        <div ref={desmosRef}></div>
    )
}

export default Desmos