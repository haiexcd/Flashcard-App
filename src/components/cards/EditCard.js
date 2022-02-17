import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";
import FormCard from "./FormCard";


function EditCard() {
    const { deckId, cardId } = useParams();                                 // grabs the deckId and cardId from the URL 
    const [deck, setDeck] = useState({});                                   // sets the state of deck
    const history = useHistory();                                           // obtains access to browser history controls
    const id = cardId;
    
    useEffect(() => {                                                       // useEffect sets all necessary states of the deck after reading the deck from API
        readDeck(deckId).then(setDeck);
    }, [deckId]);


    async function handleSubmit(front, back) {                              // handles the submit of the cardform and redirects to the deckId deck page
        await updateCard({ front, back, id, deckId: Number(deckId) });
        history.push(`/decks/${deck.id}`);
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
                Edit Card {cardId}
              </li>
            </ol>
          </nav>
          <h2>Edit Card</h2>
          <FormCard handleSubmit={handleSubmit} />
        </>
      );
}

export default EditCard;