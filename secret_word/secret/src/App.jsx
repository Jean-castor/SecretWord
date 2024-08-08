// CSS
import './App.css';



// React
import { useCallback ,useEffect, useState } from 'react';

// importação dos dados
import {wordsList} from './data/word'

// components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';


// estágios do jogo
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

// altera o estado da pontuação
const quantidadeDeTentativas = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  
  const [letters, setLetters] = useState('');
  const [selectWord, setSelectWord] = useState('');
  const [selectCategory, setSelectCategory] = useState('');

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(quantidadeDeTentativas);
  const [score, setScore] = useState(0);

  
  
  // words returns the data object component
  const [words] = useState(wordsList);

  const pickLetters = useCallback( () => {
    // Seleciona objetos do conjunto com suas respectivas chaves
    // percorre uma categoria aleatória.
    // Math.floor() arredonda o resultado de Math.random para baixo, Math.random gera um número aletório.
    // percorre o array de objetos e as chaves de categoria em seu cumprimento total.
    
    const categories = Object.keys(words);
    const category = 
    categories[ Math.floor( Math.random() * Object.keys(categories).length)];

    // Selecionando palavra aleatória
    const word = words[category][ Math.floor( Math.random() * words[category].length)]
    // Fim seleção de palavra 

    return {word, category};
  }, [words]);
  
  // Starts the secret word game
  const startGame = useCallback( () => {

    clearLetterstates();

    // primeiro o jogo carrega
    const {word, category} = pickLetters();
  
    
    // início criação de array de letras formatadas em minúsculas 
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((le) =>  le.toLowerCase())
    
    // Fim do array de minúsculas

    // fill stages

    setLetters(wordLetters);
    setSelectWord(word);
    setSelectCategory(category);
    
    setGameStage(stages[1].name);
  } ,[ pickLetters]);

  // processes the letter input
  const veriFyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // checar se a letra já foi utilizada

    if(guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)
    ) {
      return;
    };

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWronLetters) => [
        ...actualWronLetters,
        normalizedLetter,
      ]);

      // Diminuição das tentaivas
      setGuesses((actualGuesses) => actualGuesses -1);
    }
    //setGameStage(stages[2].name);
  };

  // limpa os estados das letras

  const clearLetterstates = () => {
    // reseta os estados de tentativas
    setGuessedLetters([]);

    // reseta os estados de letras erradas
    setWrongLetters([]);
  };
  
  // useEffect monitora alguma ação
  // dentro do array está a função que deve ser monitorada
  // checa se as tentativas terminaram
  useEffect(() => {

    if(guesses <= 0){
      // se as tentativas terminarem, o jogo termina
      // e o usuário é redirecionado para a tela de fim de jogo
      // e a pontuação é exibida
      // os estados de letras são limpos
      clearLetterstates();

        setGameStage(stages[2].name)
    }
  }, [guesses]);

  useEffect(() => {
    // checa se o usuário acertou todas as letras
  const uniqueLetters = [...new Set(letters)];

  if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {

    setScore((actualScore) => actualScore += 100);
    // restart game with new word
    startGame();
  }

 
  }, [ guessedLetters, letters, startGame, gameStage]);

  // retry the game
  // retorna ao início do jogo

  const retry = () => {
    // zera a pontuação so reiniciar
    setScore(0);

    // retorna o valor de tentativas para 3
    setGuesses(quantidadeDeTentativas)

    // retorna ao início do jogo
    setGameStage(stages[0].name);
  };


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame = { startGame } /> }
      {gameStage === 'game' && (
        <Game 
          veriFyLetter = { veriFyLetter }
          selectWord = { selectWord }
          selectCategory = { selectCategory }
          letters = {letters}
          guessedLetters = {guessedLetters}
          wrongLetters = { wrongLetters }
          guesses = { guesses }
          score = { score }
        />
      )}

      {/* A pontuação é passada como prop para o componente GameOver através de score*/}
      {/* o jogo é reiniciado utilizando a prop retry que recebe o stage de 0 */}

      {
        gameStage === 'end' &&
        <GameOver retry = { retry } score = {score} />
      }
    </div>
  );
}

export default App;
