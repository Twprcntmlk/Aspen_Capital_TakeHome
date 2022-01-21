import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import redCard from "./CardRed.png"
import blueCard from "./CardBlue.png"
import './PlayerComponent.css';

function PlayerComponent({player, playerDeck, setPlayerDeck, setPlayedCard, gameStatus, setError, error, playerPlayed, setPlayerPlayed, playerInfo}){
    const user = useSelector(state => state.session.users)

    const PlayTopCard = () => {

        if (playerPlayed ===false && gameStatus === true){
            let CopycurrentPlayerDeck = playerDeck
            const topcard = CopycurrentPlayerDeck.shift()
            setPlayerDeck(CopycurrentPlayerDeck)
            setPlayedCard(topcard)
            setPlayerPlayed(true)
        } else{
            setError(error.concat(["Game has Not Started"]))
        }
    }



    return (
        <div id="PlayerBackground">
            <div id="Player_Area">
                <div id="PlayerDeck">
                    {user[player] ?
                    <div>
                        <div>Player: {user[player].username}</div>
                        <div>Player Wins: {user[player].wins}</div>
                    </div>
                    :
                    player === "playerOne" ?
                    <div>Player: Player One</div>
                    :
                    <div>Player: Player Two</div>
                    }

                    {player==="playerOne" ?
                    <div><img className="cardImg" src={redCard}></img></div>
                    :
                    <div><img className="cardImg" src={blueCard}></img></div>
                    }
                    <div>Cards in Deck: {playerDeck.length}</div>
                </div>
                <div id="PlayerControls">
                    <div id="PlayHand">
                        <button onClick={PlayTopCard}>Play Hand</button>

                    </div>
                </div>
        </div>


        </div>
    );
}

export default PlayerComponent;
