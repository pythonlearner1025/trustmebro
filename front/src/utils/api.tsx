import axios from "axios"

const URI = 'http://0.0.0.0:3001/api'


export const getQuestion = async () => {
   const data = await axios.post(
       URI + '/generate-question', {'question_type': 'calculus'}
       ).then(res => res.data)
    return data
}

export const checkAnswer = async (answer: string) => {
    const data = await axios.post(
        URI + '/check-answer', {'question_type': 'calculus', 'answer': answer}
    ).then(res => res.data)
    return data
}

