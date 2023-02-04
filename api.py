from fastapi import FastAPI
from engine import CalcQuestion, CalcHint, CalcEval
from langchain.llms.loading import load_llm
from pydantic import BaseModel
from dotenv import load_dotenv
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
cache = CacheManager()
llm = load_llm(os.path.join(os.getcwd(), os.environ.get('LLM_CONFIG')))

class Question(BaseModel):
    question_type: str

class Answer(BaseModel):
    question_type: str
    answer: str


def generate_answer(wolfram_query):
    pass

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
    eval_res:bool = generator.generate()
    if eval_res:
        return {'correct': 'true', 'hint': None}
    else:
        generator = CalcHint(llm, cache.question, answer.answer)
        hint = generator.generate()
        return {'correct': 'false', 'hint': hint} 

@app.post("/api/generate-hint")
def generate_hint(answer: Answer):
    if answer.question_type == 'calculus':
        generator = CalcHint(llm, cache.question, answer.answer)
        hint = generator.generate()
        data = {'hint': hint}
    return data



# check question validity



# 