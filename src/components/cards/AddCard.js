import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import FormCard from "./FormCard";

function AddCard() {
  const { deckId } = useParams();                                  // grabs the deckId from the URL (:deckId)
  const [deck, setDeck] = useState({});                            // sets the state of deck

  useEffect(() => {                                                // useEffect sets all necessary states of the deck after reading the deck from API
    readDeck(deckId).then(setDeck);
  }, [deckId]);


  async function handleSubmit(front, back, setFront, setBack) {    // handles the submit of the cardform
    createCard(deckId, { front, back });
    setFront("");
    setBack("");
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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <FormCard handleSubmit={handleSubmit} />
    </>
  );
}

export default AddCard;