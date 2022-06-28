import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import topImg from ".//components/topImg.png"
import bottomImg from ".//components/bottomImg.png"
import QuizzPage from './components/QuizzPage';
import StartPage from './components/StartPage';
import reportWebVitals from './reportWebVitals';


function Index (){
  const [startQuizz, setstartQuizz] = useState(true)
  function quizzStart(){
    setstartQuizz(!startQuizz)
}


  return (
     
    <main>
    <img alt="" className="shape-top"  src={topImg} />
    {
        startQuizz
        ?
        <StartPage quizzStart={quizzStart}/>
        :
         <QuizzPage quizzStart={quizzStart}/> 
          }
      <img alt="" className="shape-bottom"  src={bottomImg} />
      <footer>Developed by&nbsp;<a href="https://github.com/BonatheRipper" target="_blank" rel="noreferrer">Izeogu Andrew</a></footer>
      </main>
    )

}
ReactDOM.render(<Index /> , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
