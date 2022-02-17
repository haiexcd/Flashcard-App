import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";


function DeckOverview() {
  const { deckId } = useParams();                                         // grabs the deckId from the URL (:deckId)
  const [deck, setDeck] = useState({ cards: [] });                        // sets the state of deck
  const history = useHistory();                                           // obtains access to browser history controls

  useEffect(() => {                                                       // useEffect sets all necessary states of the deck after reading the deck from API
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleDeleteDeck = (deckId) => {                                  // delete handler for deck deletion then redirects
    const confirmDelete = window.confirm(
      "Delete this deck? \n\n You will not be able to recover it."
    );

    if (confirmDelete) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  const handleDeleteCard = (cardId) => {                                   // delete handler for card deletion then redirects
    const confirmDelete = window.confirm(
      "Delete this card? \n\n You will not be able to recover it."
    );
    if (confirmDelete) {
      deleteCard(cardId);
      history.go();
    }
  };

  const fullCard = deck.cards.map(({ front, back, id }) => {
    return (
      <div className="row" key={id}>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
              <p className="card-text col">{front}</p>
              <p className="card-text col">{back}</p>
              </div>
              <div className="float-right">
                <Link to={`/decks/${deck.id}/cards/${id}/edit`}>
                  <button className="btn btn-secondary mr-2">
                    <span className="oi oi-pencil"></span> Edit
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteCard(id)}
                >
                  <span className="oi oi-trash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card" key={deck.id}>
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}/edit`}>
            <button className="btn btn-secondary">
              <span className="oi oi-pencil"></span> Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="ml-2 btn btn-primary">
              <span className="oi oi-book mr-2"></span> Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button className="ml-2 btn btn-primary add-cards">
              <span className="oi oi-plus mr-2"></span> Add Cards
            </button>
          </Link>
          <button
            type="button"
            className="float-right btn btn-danger"
            onClick={() => handleDeleteDeck(deckId)}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
      <h2>Cards</h2>
      {fullCard}
    </div>
  );
};

export default DeckOverview;