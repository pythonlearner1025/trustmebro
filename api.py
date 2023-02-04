from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from engine import CalcQuestion, CalcHint, CalcEval, wolframAsk
from langchain.llms.loading import load_llm
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
import os

class CacheManager():
    def __init__(self):
        self.latest_question = None
        self.latest_answer = None
    
    def set_question(self, question):
        self.latest_question = question
    
    def set_answer(self, answer):
        self.latest_answer = answer


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = CacheManager()
llm = load_llm(os.path.join(os.getcwd(), os.environ.get('LLM_CONFIG')))

class Question(BaseModel):
    question_type: str

class Answer(BaseModel):
    question_type: str
    answer: str


def generate_answer(wolfram_query):
    res = wolframAsk(wolfram_query)
    construct_result = res[list(res.keys())[0]]
    print('wolfram answer:')
    print(construct_result)
    return construct_result

# check student answer
# if student answer wrong, generate hint 1.
# 

# generate question based on question_type
@app.post("/api/generate-question")
def generate_question(question: Question):
    if question.question_type == 'calculus':
        generator = CalcQuestion(llm)
        question = generator.generate()
        answer = generate_answer(question)
        data = {'question': question, 'answer': answer}

        cache.set_question(question)
        cache.set_answer(answer)
    return data

# evaluate question (wolfram)
@app.post("/api/check-answer")
def check_answer(answer: Answer):
    question = cache.latest_question
    user_answer = answer.answer
    wolfram_answer = generate_answer(question)
    generator = CalcEval(llm, wolfram_answer, user_answer)
    eval_res:str = generator.generate(question).strip()
    if eval_res.find('True') >= 0:
        return {'correct': 'true', 'hint': None, 'answer': wolfram_answer}
    else:
        generator = CalcHint(llm, cache.latest_question, answer.answer)
        hint = generator.generate()
        return {'correct': 'false', 'hint': hint} 

@app.post("/api/generate-hint")
def generate_hint(answer: Answer):
    if answer.question_type == 'calculus':
        generator = CalcHint(llm, cache.latest_question, answer.answer)
        hint = generator.generate()
        data = {'hint': hint,}
    return data


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=3001)
# check question validity



# 