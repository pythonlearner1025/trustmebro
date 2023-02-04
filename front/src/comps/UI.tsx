import {useState, useEffect, useRef} from "react"
import Chat from "./Chat"
import Question from "./Question"
import {ChatObject, SavedQuestion} from "../types/types"
import {getQuestion, checkAnswer} from "../utils/api"
import "../App.css"
import axios from "axios"
import add from "../assets/add.svg"


/*
    Local Storage:
    chat_history: [
        {from: 'gpt', content: '', desmos: '', idx: ''}
    ]
    question_history: [
        {name: '', content: ''}
    ]
*/
const o0: ChatObject = {
    from: 'bot',
    type: 'bot_question',
    body: 'my question to you is ha',
    desmos: null,
    idx: 0
}

const o1: ChatObject = {
    from: 'human',
    type: 'human_answer',
    body: 'my answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blah my answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blahmy answer is blah',
    desmos: null,
    idx: 1
}
// each time GPT generates, add to local storage

// on useEffect, try and pull from local storage first

// clear for clearing local storage
const URI = 'http://0.0.0.0:3001/api'
const UI = () => {
    const [questions, setQuestions] = useState<Array<SavedQuestion>>([])
    const [chatlog, setChatlog] = useState<Array<ChatObject>>([])
    const [loading, setLoading] = useState(true)
    const [viewing, setViewing] = useState(false)
    const topRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const qRef = useRef<HTMLDivElement>(null)
    /*
        - on first load, generate a random question
        - on user response, call check-answer to api
        - if the answer is false, generate hint
        - if the answer is true, archive the question and generate new one
        - if time runs out, give away answer
    */

    const get = async () => {
        try {
            setLoading(true)
            await axios.post(
                URI + '/generate-question', {'question_type': 'calculus'}
                ).then(res => {
                const obj: ChatObject = {
                    from: "bot",
                    type: "bot_question",
                    body: res.data.question,
                    desmos: null,
                    idx: 0
                }
            setChatlog([obj])
        })
        } finally {
            console.log('here')
            setLoading(false)
        } 
    }

    useEffect((()=> {
        qRef.current!.style.paddingLeft = '3px';
        qRef.current!.style.paddingRight = '3px';
        qRef.current!.style.display = 'inline-block';
        qRef.current!.style.borderRadius = '3px';
        if (chatlog.length > 0) return
        setViewing(false)
        const history = localStorage.getItem("chat_history")
        if (history != null) {
            const li:Array<ChatObject> = JSON.parse(history)
            setChatlog(li)
            return
        }
        get()
       
    }),[chatlog])

    useEffect((()=>{

    }), [questions])

    const parse = (s:string) => {
        const parts = s.split('=')
        console.log(parts)
        const last = parts[parts.length-1]
        console.log(last)
        console.log(last.replaceAll(' ', '*'))
        return last.replaceAll(' ', '*')
    }

    const handleEnter = (e: any) => {
        if (e.key == 'Enter') {
            const ans = inputRef.current!.value
            const newlog = [...chatlog]
            const ansobj: ChatObject = {
                from: "human",
                type: "human_answer",
                body: ans,
                desmos: null,
                idx: chatlog.length-1
            }
            setChatlog([...chatlog, ansobj])
            newlog.push(ansobj)
            const checked = checkAnswer(ans)
            checked.then(data => {
                console.log(data)
                if (data.correct == 'true') {
                    const congratsobj: ChatObject = {
                        from: "bot",
                        type: "bot_answer",
                        body: `Congradulations!\nYou got answer correct. The answer was ${data.answer} You can check out its graph below. Press New Question to keep grinding`,
                        desmos: 'x',
                        idx: newlog.length
                    }
                    newlog.push(congratsobj)
                    const saved: SavedQuestion = {
                        question: chatlog[0].body,
                        chatLog: newlog                    
                    }
                    setViewing(true)
                    setChatlog(newlog)
                    setQuestions([...questions, saved])
                } else {
                    const obj: ChatObject = {
                        from: "bot",
                        type: "bot_hint",
                        body: data.hint,
                        desmos: null,
                        idx: chatlog.length-1
                    }
                    setChatlog([...newlog, obj])
                }
            })
            inputRef.current!.value = ''
        }
    }

    const handleSelectQ = (log: Array<ChatObject>) => {
        console.log('updating chatlog...')
        setChatlog(log)
        setViewing(true)
    } 

    const handleNewChat = () => {
        console.log('handle new chat')
        setChatlog([])
        setViewing(false)
    }

    return (
        <div ref={topRef} className="calculus-top">
            <div className="interface-wrapper">
                <div className="question-wrapper background-light">
                    <div className="questions">
                        <div className="question-top status-good-color"
                        onClick={handleNewChat} 
                        >
                            <div 
                            ref={qRef}
                            className="question-header"
                            onMouseEnter={()=>qRef.current!.style.backgroundColor = '#a991eb'}
                            onMouseLeave={()=>qRef.current!.style.backgroundColor = '#8058ee'}
                             style={{textAlign:'center'}}>
                                <h3>New Question</h3>
                            </div>
                         </div>
                        {questions.map((q, i)=> {
                            return (
                                <Question key={i} q={q} selectQ={handleSelectQ}/>
                            )
                        })}
                    </div>
                </div>
                <div className="chat-wrapper black">
                    <div className="chat-flexbox">
                        {(loading?
                        <div className="chat-top background-light-light" >
                            <p style={{marginLeft: 5}}>thinking...</p>
                        </div>
                        :<></>)}
                        {chatlog.map((chat,i)=> {
                            return (
                                <Chat key={i} chat={chat}/>
                            )
                        })}
                    </div>
                    {(!viewing? <div className="chat-input background-light-light">
                        <div>
                            <input 
                            ref={inputRef}
                            className="input"
                            onKeyUp={handleEnter}
                            ></input>
                        </div>
                    </div>: <div className="chat-input"></div>)}
                </div>
            </div>
        </div>
    )
}

export default UI
