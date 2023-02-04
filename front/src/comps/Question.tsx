import {SavedQuestion, ChatObject} from "../types/types"
import chat from "../assets/chat.svg"

interface Props {
    q: SavedQuestion
    selectQ: (chatlog: Array<ChatObject>) => void 
}

const Question = (props: Props) => {

    const handleClick = () => props.selectQ(props.q.chatLog)
    return (
        <div className="question-top status-good-color"
        onClick={handleClick} 
        >
            <div className="question-header">
                <h5>
                <img className="chat-ico"src={chat}/>
                {props.q.question}
                </h5>
            </div>
        </div>
    )
} 

export default Question