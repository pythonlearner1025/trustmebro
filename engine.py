from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
import wolframalpha as wa
import json
import xmltodict


QUESTION = '''
            {none}
            You are a math assistant that is tasked with generating similiar calculus problems
            given examples of calculs problems. Look at the examples below and generate a single 
            novel problem based on the example problems. Prefix the output with 'Question:'
            
            Examples:
            - Find the derivative of ln(e^(2x)) with respect to x
            - Evaluate the definite integral from 0 to 1 of sqrt(x^2-2x+1) dx
            - Right Riemann sum, 4 subintervals, f(x)=9^x, 0 to 2.
            - Limit of x^3/e^(3x) as x approaches infinity.
            Go!
        '''
HINT = '''
            You are a math assistant tasked with generating hints to help student solve
            a math question. You should never give away answers, but only assist the students
            by suggesting techniques to use or concepts to use. Based on the question and the student
            answer given below, generate a hint to give to the student.

            Question: {question}

            Answer: {answer}

            Go!'''



class CalcQuestion():
    prompt = PromptTemplate(
        input_variables=["none"],
        template=QUESTION
    )
    def __init__(self, llm):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
    
    def generate(self):
        try:
            return self.chain.run('hi!')
        except Exception as e:
            print('error during run',e)

class CalcHint():
    prompt = PromptTemplate(
        input_variables=["question", "answer"],
        template=HINT
    )
    def __init__(self, llm, question, answer):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
        self.q = question
        self.a = answer
      
    def generate(self):
        try:
            return self.chain.run(question=self.q, answer=self.a)
        except Exception as e:
            print(e)

class CalcEval():
    prompt = PromptTemplate(
        input_variables=["user_answer", "wolfram_answer", 'question'],
        template='''
        You are acting as a math assistant comparing student answers to
        model answers to the question. You are to answer only using 
        one word, True or False. Say true when the student's answer is mathematically 
        equal to the model answer. Say false when it is not. 

        This is the question:
        {question}

        This is the student's answer:
        {user_answer}

        This is the model answer:
        {wolfram_answer}

        GO!
        '''
    ) 
    def __init__(self, llm, user_answer, wolfram_answer):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
        self.user_answer = user_answer
        self.wolfram_answer = wolfram_answer
      
    def generate(self, question):
        try:
            res = self.chain.run(user_answer=self.user_answer,
             wolfram_answer=self.wolfram_answer, question=question)
            return res
        except Exception as e:
            print(e)


def wolframAsk(question):
    client = wa.Client("9H7RKK-H7KYTPWXHQ")
    res = client.query(question)
    results = {}
    i = 1
    for pod in res.results:
        for sub in pod.subpods:
            val = sub.plaintext
            key = "res" + str(i)
            results[key] = val
            i += 1
    return results