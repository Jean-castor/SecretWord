import { useState, useRef } from "react"
import './Game.css'

function Game({
   veriFyLetter, 
   selectWord,
   selectCategory,
   letters,
   guessedLetters,
   wrongLetters,
   guesses,
   score,
}) {

  const [letter, setLetter] = useState("");

  //  mantém o input referenciado para o jogador;
  const letterInputRef = useRef(null);

   const handleSubmit = (e) => {
    e.preventDefault();
    veriFyLetter(letter);
    setLetter("");

    // mantém o foco no elemento desejado
    letterInputRef.current.focus();
   };

  return (

    <div className="main_game">
      <div className="game">
       <h2>Advinhe a palavra</h2>
       <p className="points">
         <span>Pontuação: {score}</span>
       </p>
        <h3 className="tip">
          Dica: <span> {selectCategory} </span>
        </h3>
        <p className="tentativas">Você possui {guesses} tentativas</p>
        <div className="box">
          <div className="wordContainer">
            {letters.map((letter, i) => 
              guessedLetters.includes(letter) ? (
               <span key={i} className="letter">
                {letter}
               </span>
              ) : (
              <span key={i} className="blankSquare"></span>
             )
            )}
          </div>
        </div>
        <div className="letterContainer">
          <h3>Escolha uma letra</h3>
          <form onSubmit={handleSubmit}>
             <input 
              type="text" 
              name="letter" 
              maxLength="1" 
              required 
              onChange={ (e) => setLetter(e.target.value)}
              value={letter}
              // mantém o input referenciado
              ref={letterInputRef}
             />
             <button>Jogar!</button>
          </form>
          <div className="wronLettersContainer">
            <p>Letras incorretas:
             {wrongLetters.map((letter, i) => (
               <span style={{color: "orange", fontSize: "30px", fontWeight: "bold"}} key={i}> {letter} - </span>
              ) )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
