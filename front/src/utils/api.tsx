import axios from "axios"

const URI = 'http://localhost:5000/api'


export const getQuestion = async () => {
   const data = await axios.post(
       URI + '/generate-question', {'question_type': 'calculus'}
       ).then(res => res.data)
    return data
}

export const checkAnswer = async (answer: string) => {
    const data = await axios.post(
        URI + '/generate-hint', {'question_type': 'calculus', 'answer': answer}
    ).then(res => res.data)
    return data
}

