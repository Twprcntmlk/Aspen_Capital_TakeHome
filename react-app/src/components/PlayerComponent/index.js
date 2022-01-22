import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import redCard from "./CardRed.png"
import blueCard from "./CardBlue.png"
import './PlayerComponent.css';

function PlayerComponent({player, playerDeck, setPlayerDeck, setPlayedCard, gameStatus, setError, error, playerPlayed, setPlayerPlayed, playerInfo}){
    const user = useSelector(state => state.session.users)
    const userInfo = useSelector(state => state.user.users)
    const [winsCount, setWinsCount] = useState(0)

    const PlayTopCard = () => {

        if (playerPlayed === false && gameStatus === true){
            let CopycurrentPlayerDeck = playerDeck
            const topcard = CopycurrentPlayerDeck.shift()
            setPlayerDeck(CopycurrentPlayerDeck)
            setPlayedCard(topcard)
            setPlayerPlayed(true)
        }
        else if(gameStatus === false) {
            setError(error.concat(["Game has Not Started"]))
        }
    }
    console.log(playerInfo)

    useEffect(() => {
        if (userInfo && playerInfo && playerInfo['id'] ){
            let playerId = playerInfo['id']
            let updatedwin = userInfo[playerId]
            if (updatedwin){
                setWinsCount(updatedwin["wins:"])

            }
        }
        else if (user && user[player]) {
            setWinsCount(user[player]["wins:"])
        }

    },[user, userInfo, player, winsCount])

    return (
        <div id="PlayerBackground">
            <div id="Player_Area">
                <div id="PlayerDeck">
                    {user && user[player] ?
                    <div>
                        <div>Player: {user[player].username}</div>
                        <div>Player Wins: {winsCount}</div>
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
