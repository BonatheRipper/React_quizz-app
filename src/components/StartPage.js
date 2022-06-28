import React, {useState, useEffect} from 'react';
import "./start.css"


export default function StartPage(props){
    const [triviaUrl, setTrivialUrl] = useState("")
    const [gameOptions, setGameOptions] = useState({
        amount:10,
        category:"",
        difficulty:"",
        type:"",
        encode:'base64'
         })

         useEffect(()=>{
            getLink()
        },[gameOptions])

      function getQuiz(e){
        setGameOptions((prevData)=>{
            const {name,value} = e.target;
         return  { ...prevData,
            [name]: value
               }
        })
      }
  

      function getLink(){        
      let url = "https://opentdb.com/api.php?"
      for(const item in gameOptions){
       
          if(gameOptions[item]){
            
              url+=`${item}=${gameOptions[item]}&`
          }
      }
      setTrivialUrl(url.slice(0, -1))
  }

  function getLinkBtn(){        
    let url = "https://opentdb.com/api.php?"
    for(const item in gameOptions){
      if(item === "amount" && gameOptions[item]=== ""){
          gameOptions[item] = Math.floor(Math.random()*50)
        }
        if(gameOptions[item]){
          
            url+=`${item}=${gameOptions[item]}&`
        }
    }
    setTrivialUrl(url.slice(0, -1))
    fetch(triviaUrl)
          .then(res => res.json())
          .then(
            (result) => {
                if(result){
                    
                    localStorage.setItem('questions', JSON.stringify(result));
                    props.quizzStart()

                }
            }
          )
}
function resetGameNum(){
    var num = gameOptions.amount+""

    return Number(num.slice(0, -1))

}







    return (
        
            <section className="game-options vertical-center ">
                <div className="top-text">
                    <h1>Random Quizz</h1>
                    <p>Answer questions, test your knowledge and have fun</p>
                    <div className="quizz-options ">
                    <div className="quizz-inner quizz-category form-group">
                    <label className="custom-label" htmlFor="category">Category:</label>
                   <select 
                    value={gameOptions.category}
                    onChange={getQuiz}
                    name="category" 
                    id="category" 
                    className="form-select form-select-lg mb-3" 
                    aria-label=".form-select-lg example">
                        <option value="">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option></select>                    
                    </div>
                   
                    <div className="quizz-inner quizz-difficulty form-group">
                    <label className="custom-label" htmlFor="difficulty">Difficulty:</label>
                    <select 
                    value={gameOptions.difficulty}
                    onChange={getQuiz}
                    name="difficulty" 
                    id="difficulty" 
                    className="custom-select form-select form-select-lg mb-3">
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        </select>
                    </div>
                        
                    <div className="quizz-inner quizz-type-of-question form-group">
                    <label className="custom-label" htmlFor="type-of-question">Type of questions:</label>
                    <select 
                    value={gameOptions.type}
                    onChange={getQuiz}
                    name="type" id="type-of-question" 
                    className="custom-select form-select form-select-lg mb-3">
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                        </select>
                    </div>

                    <div className="quizz-inner quizz-type-of-question form-group">
                    <label className="custom-label " htmlFor="no-of-questions">Number of Questions:</label>
                    <input  
                    onChange={getQuiz}
                    name="amount"
                    type="number"
                    value={gameOptions.amount>50?resetGameNum():gameOptions.amount}
                    placeholder="Enter number" id="no-of-questions" className="custom-select form-control form-control-lg mb-3" />
                       
                    </div>
                    </div>
                </div>
                <div className="btn-box">
                    <button className="btn  custom-btn btn-outline-secondary"
                    onClick={getLinkBtn}>Start Quizz</button>
                </div>

            </section>
           
    )
}