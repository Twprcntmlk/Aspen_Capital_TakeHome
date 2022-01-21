import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import PlayerComponent from "../PlayerComponent"

import './MainComponent.css';

function MainComponent(){
  const user = useSelector(state => state.session.users)

  const [playerOneInfo, setPlayerOneInfo] = useState({})
  const [playerTwoInfo, setPlayerTwoInfo] = useState({})

  const [playerOneDeck, setPlayerOneDeck] = useState([])
  const [playerTwoDeck, setPlayerTwoDeck] = useState([])

  const [playerOnePlayedCard, setPlayerOnePlayedCard] = useState({})
  const [playerOnePlayed, setPlayerOnePlayed] = useState(false)
  const [playerTwoPlayedCard, setPlayerTwoPlayedCard] = useState({})
  const [playerTwoPlayed, setPlayerTwoPlayed] = useState(false)

  const [currentDeck, setCurrentDeck] = useState([])
  const [middleDeck, setMiddleDeck] = useState([])
  const [gameStatus, setGameStatus] = useState(false)


  const [handStatus, setHandStatus] = useState("")
  const [errors, setErrors] = useState([])



  const createDeck = () => {
    const suits = ['Spades','Diamonds','Clubs',"Hearts"]
    const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
    let deck = new Array();
    for(let i = 0; i < suits.length; i++)
    {
      for(let x = 0; x < values.length; x++)
      {
        let card = {Value: values[x], Suit: suits[i]};
        deck.push(card);
      }
    }
    const shuffledDeck = shuffleDeck(deck)
    setCurrentDeck(shuffledDeck)
  }

  const shuffleDeck = (deck) => {
    let copyOfDeck = deck
    for(let i = 0; i < copyOfDeck.length; i++){
      let cardOne = Math.floor(Math.random()*copyOfDeck.length)
      let cardTwo = Math.floor(Math.random()*copyOfDeck.length)
      let temp = copyOfDeck[cardOne]
      copyOfDeck[cardOne] = copyOfDeck[cardTwo]
      copyOfDeck[cardTwo] = temp
    }
    return copyOfDeck
  }

  const dealDeck = () => {
    let copyOfDeck = currentDeck
    setPlayerOneDeck(copyOfDeck.slice(0,26))
    setPlayerTwoDeck(copyOfDeck.slice(26,52))
    setCurrentDeck([])
  }

  const gameStart = () => {
    createDeck()
    setGameStatus(true)
  }

  const cardWinner = () => {
    const values = {"2":0,"3":1,"4":2,"5":3,"6":4,"7":5,"8":6,"9":7,"10":8,"J":9,"Q":10,"K":11,"A":12}
    let player1card = playerOnePlayedCard
    let player2card = playerTwoPlayedCard
    let cardToaddBack = [player1card, player2card]
    if(playerOnePlayed && playerTwoPlayed){
      if (+values[player1card.Value] > +values[player2card.Value]){
        let playerOneDeckcopy = playerOneDeck
        setPlayerOneDeck(playerOneDeckcopy.concat(cardToaddBack).concat(middleDeck))
        setMiddleDeck([])
        setHandStatus('Player 1')
      }
      else if (+values[player1card.Value] < +values[player2card.Value]){
        let playerTwoDeckcopy = playerTwoDeck
        setPlayerTwoDeck(playerTwoDeckcopy.concat(cardToaddBack).concat(middleDeck))
        setMiddleDeck([])
        setHandStatus('Player 2')
      }
      else if (+values[player1card.Value] === +values[player2card.Value]){
        setMiddleDeck(middleDeck.concat(cardToaddBack))
        if (middleDeck.length > 0){
          setHandStatus('Tie')
        }

      }
    }
    setPlayerOnePlayed(false)
    setPlayerTwoPlayed(false)
  }

  // const nextHand = () => {
  //   setPlayerOnePlayedCard({})
  //   setPlayerTwoPlayedCard({})
  // }

  useEffect(() => {
      if (currentDeck.length > 0){
        dealDeck()
      }
  }, [currentDeck]);

  useEffect(() => {
    if (playerOnePlayed && playerTwoPlayed && gameStatus===true){
      cardWinner()
    }

    if (playerOneDeck.length===0 && gameStatus===true){
      setGameStatus(false)
      setMiddleDeck([])
      playerOneDeck([])
      playerTwoDeck([])
      playerOnePlayedCard([])
      playerTwoPlayedCard([])

    }

    if (playerTwoDeck.length===0 && gameStatus===true ){
      setGameStatus(false)
      setMiddleDeck([])
      playerOneDeck([])
      playerTwoDeck([])
      playerOnePlayedCard([])
      playerTwoPlayedCard([])

    }

  }, [playerOnePlayedCard, playerTwoPlayedCard]);


  useEffect(() => {
    if (user && user.PlayerOne){
      let data = user.PlayerOne
      setPlayerOneInfo(data)
    }
    if (user && user.PlayerTwo){
      let data = user.PlayerTwo
      setPlayerTwoInfo(data)
    }
  }, [user, playerOneInfo, playerTwoInfo]);

  return (
    <div className="MainPageBackground">
      <div className="Universal_Controls_Area">
        <div className="PlayerLogin">
          <NavLink className="PlayerLogin_Navlink" to="/loginPlayerOne" exact={true} player={"Player One"} >
            Player 1 Login
          </NavLink>
        </div>
        <button onClick={gameStart}>Start Game</button>
        <div className="PlayerLogin">
          <NavLink className="PlayerLogin_Navlink" to="/loginPlayerTwo" exact={true} player={"Player Two"} >
            Player 2 Login
          </NavLink>
        </div>
      </div>
      <div className="Play_Area">
        <PlayerComponent player={'playerOne'} playerDeck={playerOneDeck} setPlayerDeck={setPlayerOneDeck} setPlayedCard={setPlayerOnePlayedCard} gameStatus={gameStatus} setError={setErrors} error={errors} playerPlayed={playerOnePlayed} setPlayerPlayed={setPlayerOnePlayed} playerInfo={playerOneInfo}/>
        <div id="playarea">
          <div id="player1card" className="card_comp">
            {playerOnePlayedCard && <div>{playerOnePlayedCard.Value}{playerOnePlayedCard.Suit}</div>}
          </div>
          <div id="playstatus">
            {gameStatus && <div id="gameStatus"> Game has begun</div>}
            <div className="playstatus_comp">Winner is:</div>
            <div className="playstatus_comp">
              {handStatus && <div >{handStatus}</div>}
            </div>
            <div className="playstatus_comp">Cards in Pool:</div>
            <div className="playstatus_comp">
              {middleDeck && <div className="playstatus_comp">{middleDeck.length}</div>}
            </div>

          </div>
          <div id="player2card" className="card_comp">
            {playerTwoPlayedCard && <div>{playerTwoPlayedCard.Value}{playerTwoPlayedCard.Suit}</div>}
          </div>
        </div>
        <PlayerComponent player={'playerTwo'} playerDeck={playerTwoDeck} setPlayerDeck={setPlayerTwoDeck} setPlayedCard={setPlayerTwoPlayedCard} gameStatus={gameStatus} setError={setErrors} error={errors} playerPlayed={playerTwoPlayed} setPlayerPlayed={setPlayerTwoPlayed} playerInfo={playerTwoInfo}/>
      </div>
    </div>
  );
}

export default MainComponent;
//src/components/index.js
// Line 45:6:  Expected an assignment or function call and instead saw an expression  no-unused-expressions
// Line 46:5:  'shuffle' is not defined
