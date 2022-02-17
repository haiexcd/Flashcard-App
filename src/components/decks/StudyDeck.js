import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";


function StudyDeck() {
    const [deck, setDeck] = useState({ cards: [] });                                // sets the states of deck, currentCard, and cardFront
    const [currentCard, setCurrentCard] = useState(1);
    const [cardFront, setCardFront] = useState(true);
    const history = useHistory();                                                   // obtains access to browser history controls
    const { deckId } = useParams();                                                 // grabs the deckId from the URL (:deckId)
    
    useEffect(() => {                                                               // useEffect sets all necessary states of the deck after reading the deck from API
        readDeck(deckId).then(setDeck);
    }, [deckId]);

    const card = deck.cards[currentCard - 1];

    function handleNextCard() {                                                     // HandleNextCard sets the current position of the cards
        if (currentCard !== deck.cards.length) {                                    
            setCurrentCard(currentCard + 1);
            setCardFront(true);
        } else {
            const confirmDelete = window.confirm(
                "Restart Cards \n\n Click 'cancel' to return to the home page."
            );
            if (confirmDelete) {
                setCurrentCard(1);
                setCardFront(true);
            } else {
                history.push("/")                                                   // redirects home
            }
        }
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home"></span> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>

            <h1 className="ml-2">Study: {deck.name}</h1>
            <div className="card">
                {deck.cards.length > 2 ? (
                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard} of {deck.cards.length}
                        </h5>

                        {cardFront ? (
                            <p className="card-text">{card.front}</p>
                        ) : (
                            <p className="card-text">{card.back}</p>
                        )}

                        <button
                            type="btn"
                            className="btn btn-secondary"
                            onClick={() => setCardFront(!cardFront)}
                        >
                            Flip
                        </button>

                        {!cardFront ? (
                            <button
                                type="btn"
                                className="btn btn-primary m-2"
                                onClick={handleNextCard}
                            >
                                Next
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <>                                                                   
                        <div className="card-body">
                            <h3 className="card-title">Not Enough Cards</h3>
                            <p>
                                You need at least 3 cards to study. There are{" "}
                                {deck.cards.length} cards in this deck.
                            </p>
                            <Link
                                to={`/decks/${deck.id}/cards/new`}
                                className="btn btn-primary"
                            >
                                <span className="oi oi-plus mr-2"></span>
                                Add Cards
                            </Link>
                        </div>
                    </>
                )}
            </div>

        </>
    );
}

export default StudyDeck;