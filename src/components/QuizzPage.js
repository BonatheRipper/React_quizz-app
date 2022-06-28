import React, {useState, useEffect} from 'react';
import "./start.css"
import "./quiz.css"
import good from './good.svg'
import bad from './bad.svg'
import restart1 from './restart1.png'

import { v4 as uuidv4 } from 'uuid';



export default function QuizzPage(props){

const [question, SetQuestions] =  useState([JSON.parse(localStorage.getItem('questions'))])
const [btnOnOff, setBtnOnOff] = useState(true)
const [showAnswer, setshowAnswer] = useState(false)
const [questionResults, setQuestionResults] = useState({correct:0,Bad:0})
const [optionsBtn, setOptionsBtn] = useState(true)
function setQuestions(){
    window.addEventListener("storage",(e) => {
        SetQuestions(JSON.parse(localStorage.getItem('questions')))
     });
}
setQuestions()
useEffect(()=>{
    checkIfAllAswerschecked()

      try{
    let {results} = question[0];
    let questionArr = [];
    let optionsArray = []
        for(let item of results){
            let obj = {}
            let question = atob(item.question)
            let answer = atob(item.correct_answer)
            item.incorrect_answers.forEach((item)=>{optionsArray.push(atob(item))})
        
          optionsArray.splice(Math.floor(Math.random()*optionsArray.length+1), 0, optionsArray.includes(answer)?"None":answer);
          obj.key = uuidv4();
          obj.question = question;
          obj.answer = answer
          obj.options = optionsArray;
          obj.selectedAnswer = false;
        
        questionArr.push(obj)
        obj={}
        optionsArray=[]
        }
        SetQuestions(questionArr)
    }
    catch(error){
        // console.log(error)
    }

},[question])

function checkIfAllAswerschecked(){
    const result = question.every(element => {
        if (element.selectedAnswer && element.selectedAnswer!==false) {
            return true
        }
        return false
    })
    if(result){
        setBtnOnOff(false)

    }
}



try{
    var QuestionTemplate = question.map((item)=>{
        return (
            <article className="question-container">
            <div key={item.key}>
             <h3  className="question-text">{item.question}</h3>
            { item.options.map((option)=>{
               return <button 
            //    disabled={btnOnOff==true?false:true}
               className={`
               ${!showAnswer && item.selectedAnswer===option?"question-btn-selected" :'question-btn'}
               ${showAnswer && option==item.answer?"CorrectAnswer":""}
               ${showAnswer && item.selectedAnswer===option && option!==item.answer?"WrongAnswer":""}
               `}
               onClick={()=>{selectQuestion(item.key, option)}}
               disabled={optionsBtn?false:true}
               >
                {option}
                </button>
            })
                }
            </div>
            </article>
            
        )
    })
}
catch(error){
    console.log(error)
}


function selectQuestion(questionKey,option){
        let  newArrQuestionArr = []
        for(let item of question){
            if(item.key===questionKey){
             item.selectedAnswer = option
            }
            newArrQuestionArr.push(item)
        
        }
        return   SetQuestions(newArrQuestionArr)
}

function getAnswers(){
    console.log(question)
    setshowAnswer(!showAnswer)
var addCorrect=0
var addBadd =0
    question.forEach((item)=>{
        if(item.selectedAnswer===item.answer){
            addCorrect++
        }
        else{
            addBadd++
        }
    })
    setQuestionResults((prevAnswer)=>{
        return {correct:addCorrect,Bad:addBadd}
    })
    setOptionsBtn(false)
    console.log(`you have ${addCorrect} answers and  ${addBadd} answers`)
    
}

function restartQuizz(){
props.quizzStart()

}
    return (
     
            <section className="game-options vertical-center questionList-container">
                <div className={`scoreBoard ${optionsBtn?'blurResults':''}`}>
                    <div className='goodAnswer'>
                        <img className='scoreBoardImg' src={good}  alt={"Good-answer"}/>
                        <p className='correctAnswer'>
                            
                    {questionResults.correct}
                            
                            </p>
                    </div>
                    <div className='tottal'>
                        <p className=''>  
                        {`${questionResults.correct}`}
                        </p>
                        <p>/</p>
                        <p className=''>  
                        {question.length}
                            </p>
                    </div>
                    <div className='badAnswer'>
                        <img className='scoreBoardImg' src={bad}  alt={"Bad-answer"}/>
                        <p className='correctAnswer'>
                            
                        {questionResults.Bad}
                            
                            </p>
                    </div>

                </div>
            {QuestionTemplate}
                <div className="btn-box">
                    <button 
                    className="btn  custom-btn btn-outline-secondary"
                    disabled={btnOnOff==true?true:false}
                    onClick={getAnswers}
                    >Check Answers</button>

                    {
                    optionsBtn
                    ?
                    true
                    :
                    <button 
                    className="btn  custom-btn2 btn-success"
                    onClick={restartQuizz}
                    ><img src={restart1} className='restart1' alt="Reestart"/> Play Again</button>
                    }

                </div>
            </section>
    )
}