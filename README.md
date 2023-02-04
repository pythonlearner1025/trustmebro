# Trust Me bRo 

Team Trust me bro presents our math tutor. 

## Project Abstract

We made an AI math tutor that is highly accurate, and thus trustworthy. The tutor first generates a question. If the student answer is correct, the tutor gives away the full answer + graph. If the student answer is incorrect, the tutor prompts students with informative hints. At the core of the project is OpenAI's GPT-3 text-davinci model. Instead of interactign with GPT-3 directly, we use it as an interpretation layer between the student and Wolfram Alpha. The tutor automatically context-switches to use Wolfram Alpha for calculations, and GPT-3 for hints and responses. We show that connecting a LLM to a data-source makes it far more accurate. We let the LLM play to its strengths (synthesis, presentation), while delegating its weaknesses (logic, facts) to a trustable data source. 

### Project Detailed Description 

In mathematics, it is crucial to thoroughly solve and understand a variety of problems pertaining to a certain topic in order to truly transform that concept into a skill. However, it is difficult and often tedious to consort numerous sources and filter out high quality problems that one can use to corroborate this learning process. Our math tutor combines the flexibility of GPT3 and the computational power of Wolfram Alpha to constantly generate comprehensive problems for the user, complemented by helpful learning cues such as hints, visual representations, and provision of related problems. 

For the purpose of this project, the math subject in focus was AP Calculus.

On the front end, we present the user with an interactive chat interface: problems are given to the user, prompting them to reply with the answer they obtain. When the user is incorrect, they receive hints guiding them towards the correct steps, as well as options to explore similar problems under the same topic. Correct answers initiate creation of new problems for the user. The user can always come back to any of the problems they were working on.

On the back end, GPT3 coordinates between the user and the API’s from Wolfram and Desmos. Through a dynamic question bank/database, GPT3 supplies a word problem to the user while simultaneously reformatting the question so that it can be evaluated by the Wolfram API. The result - including the step by step solution - from Wolfram is parsed and saved, and later used to check the user’s answers or supply hints when necessary.

Through an intuitive, engaging interface, our math tutor supplies students with all the components essential to efficiently learning math.


### Setup

Create a .env file and populate it with

TOKEN=<YOUR TOKEN>
OPENAI_API_KEY=<YOUR KEY>
LLM_CONFIG=llm.json


install the conda environment.

start the api.py file, and start the 
development server of the react project at /front.

open in localhost:3000