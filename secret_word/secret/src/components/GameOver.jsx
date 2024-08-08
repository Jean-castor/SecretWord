import './GameOver.css';

function End({retry, score}) {
  return (
    <div className='main_game_over'>
      <div className='game_over'>
        <h1 className='end_title'>Game Over</h1>
        <h2 className='end_points_player'>
           Sua pontuação foi: <span> {score} </span>
        </h2>
        <button onClick={retry}>Reiniciar jogo</button>
      </div>
    </div>
  )
}

export default End

