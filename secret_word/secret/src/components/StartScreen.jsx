// Date: 03/08/2021
import 'bootstrap-icons/font/bootstrap-icons.css';
import './StartScreen.css';


function StartScreen({ startGame }) {
  return (
    <div className='start'>
      <div className='header'>
        <h1>Seja bem-vindo</h1>
        <h1><span className='s'>S</span>ecret<u><span className='w'>W</span>ord</u></h1>
        <p>
          Clique no botão abaixo para jogar <br />
          <i className='bi bi-controller' style={{fontSize: "50px"}}></i>
        </p>
        <button className='start_button' onClick={startGame}>Começar o jogo</button>
      </div>
    </div>
  );
}

export default StartScreen;


