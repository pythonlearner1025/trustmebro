from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain


class CalcQuestion():
    prompt = PromptTemplate(
        template='''
            You are a math assistant that is tasked with generating similiar calculus problems
            given examples of calculs problems. Look at the examples below and generate a single 
            novel problem based on the example problems. 
            
            Examples:
            - If f(x) = 7x - 3 + ln(x), compute f’(1)
            - If y = x * sin(x), compute dy/dx
            - If y = (x^3 - cos(x))^5, compute y'
            - What is the area of the region in the first quadrant bounded by the graph of y = e^(x/2)
and the line x = 2 ?
            - If f(x) = sqrt(x^2 - 4) and g(x) = 3x - 2, compute the derivative of f(g(x)) at x = 3.

            Go!
        '''
    )
    def __init__(self, llm):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
    
    def generate(self):
        try:
            return self.chain.run()
        except Exception as e:
            print(e)

class CalcHint():
    prompt = PromptTemplate(
        input_variables=["question", "answer"],
        template='''
            You are a math assistant tasked with generating hints to help student solve
            a math question. You should never give away answers, but only assist the students
            by suggesting techniques to use or concepts to use. Based on the question and the student
            answer given below, generate a hint to give to the student.

            Question: {question}

            Answer: {answer}

            Go!
        '''
    )
    def __init__(self, llm, question, answer):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
        self.q = question
        self.a = answer
      
    def generate(self):
        try:
            return self.chain.run(self.q, self.a)
        except Exception as e:
            print(e)

class CalcEval():
    prompt = PromptTemplate(
        input_variables=["user_answer", "wolfram_answer"],
        template=''''''
    ) 
    def __init__(self, llm, user_answer, wolfram_answer):
        self.chain = LLMChain(llm=llm, prompt=self.prompt)
        self.user_answer = user_answer
        self.wolfram_answer = wolfram_answer
      
    def generate(self):
        try:
            return self.chain.run(self.user_answer, self.wolfram_answer)
        except Exception as e:
            print(e)
