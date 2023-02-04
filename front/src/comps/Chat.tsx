import {ChatObject, DesmosObject} from "../types/types"
import {useEffect, useRef, useState} from "react"
import Desmos from "./Desmos"

interface Props {
    chat: ChatObject
}
const Chat = (props: Props) => {
    const [useDesmos, setUseDesmos] = useState(false)
    const [desmos, setDesmos] = useState<DesmosObject|null>(null)
    useEffect((()=>{
        switch (props.chat.from) {
            case ('human'): {
                break
            }
            case ('bot'): {
                topRef.current!.style.backgroundColor =  '#57627077';
                break
            }
        }

        if (props.chat.desmos !== null) {
            setUseDesmos(true)
            setDesmos(props.chat.desmos)
        }
        
    }), [])

    const topRef = useRef<HTMLDivElement>(null)
    return (
        <div 
        ref={topRef}
        className="chat-top"
        >
            <p style={{marginLeft: 5}}>{props.chat.body}</p>
            {(desmos?<Desmos desmos={desmos}></Desmos>:<></>)}
        </div>
    )
}

export default Chat


