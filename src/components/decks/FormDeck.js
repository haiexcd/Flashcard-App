import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormDeck({ handleSubmit, deck, setDeck }) {
  const initializeDeck = {                                                    // initilaize deck in proper form
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...initializeDeck });              // sets the state of newDeck

  const onSubmit = (event) => {
    event.preventDefault();
    if (!deck) {
      handleSubmit(newDeck);
    } else {
      handleSubmit(deck);
    }

    setNewDeck({ ...initializeDeck });
  };

  function handleChange(event) {                                             // handles all changes to the decks name and description
    if (!deck) {
      setNewDeck({ ...newDeck, [event.target.id]: event.target.value });
    } else {
      setDeck({ ...deck, [event.target.id]: event.target.value });
    }
  }

  return (
    <div>
      {!deck && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Deck Name"
              value={newDeck.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              placeholder="Brief description of the deck"
              value={newDeck.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-deck-btns mt-3">
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary ml-2">
              Submit
            </button>
          </div>
        </form>
      )}


      {deck && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Deck Name"
              value={deck.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              placeholder="Brief description of the deck"
              value={deck.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormDeck;