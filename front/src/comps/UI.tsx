import {useState, useEffect, useRef} from "react"
import Chat from "./Chat"
import {ChatObject, SavedQuestion} from "../types/types"
import {getQuestion, checkAnswer} from "../utils/api"
import "../App.css"


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

const UI = () => {
    const [questions, setQuestions] = useState<Array<SavedQuestion>>([])
    const [chatlog, setChatlog] = useState<Array<ChatObject>>([])
    const topRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    /*
        - on first load, generate a random question
        - on user response, call check-answer to api
        - if the answer is false, generate hint
        - if the answer is true, archive the question and generate new one
        - if time runs out, give away answer
    */
    useEffect((()=> {
        const history = localStorage.getItem("chat_history")
        if (history != null) {
            const li:Array<ChatObject> = JSON.parse(history)
            setChatlog(li)
            return
        }
        const currQ = getQuestion()
        currQ.then(data => {
            const obj: ChatObject = {
                from: "bot",
                type: "bot_question",
                body: data.question,
                desmos: null,
                idx: 0
            }
            setChatlog([obj])
        })
    }),[])

    const handleEnter = (e: any) => {
        if (e.key == 'Enter') {
            const ans = inputRef.current!.value
            const checked = checkAnswer(ans)
            checked.then(data => {
                if (data.correct == 'true') {
                    //reset
                    const saved: SavedQuestion = {
                        question: chatlog[0].body,
                        chatLog: chatlog                    
                    }
                    setQuestions([...questions, saved])
                } else {
                    const obj: ChatObject = {
                        from: "bot",
                        type: "bot_hint",
                        body: data.hint,
                        desmos: null,
                        idx: chatlog.length-1
                    }
                    const newlog = []
                    chatlog.map(m => newlog.push(m))
                    newlog.push(obj)
                    setChatlog(newlog)
                }
            })
            inputRef.current!.value = ''
        }
    }

    return (
        <div ref={topRef} className="calculus-top">
            <div className="interface-wrapper">
                <div className="question-wrapper">
                    <div className="questions">

                    </div>
                </div>
                <div className="chat-wrapper">
                    <div className="chat-flexbox">
                        {chatlog.map(chat=> {
                            return (
                                <Chat chat={chat}/>
                            )
                        })}
                    </div>
                    <div className="chat-input">
                        <div>
                            <input 
                            ref={inputRef}
                            className="input"
                            onKeyUp={handleEnter}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UI
