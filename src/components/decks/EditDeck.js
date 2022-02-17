import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function EditDeck() {
  const { deckId } = useParams();                                          // grabs the deckId from the URL (:deckId)
  const history = useHistory();                                            // obtains access to browser history controls
  const id = deckId;
  const [deck, setDeck] = useState({});                                    // sets the states of deck, name, and description
  const [name, setName] = useState("");
  const [description, setDescription] = useState(deck.description);


  useEffect(() => {                                                         // useEffect sets all necessary states of the deck after reading the deck from API and form input
    readDeck(deckId).then((response) => {
      setDeck(response);
      setName(response.name);
      setDescription(response.description);
    });
  }, [deckId, setName, setDeck, setDescription]);

  function handleNameChange(event) {                                        // handles all changes to the decks name and description
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {                                           // handles the submit event from clicking submit, then redirects back to the deck page
    event.preventDefault();
    updateDeck({ name, description, id }).then((response) => {
      setDeck(response);
      history.push(`/decks/${deck.id}`);
    });
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
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder={deck.name}
            onChange={handleNameChange}
            value={name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder={deck.description}
            onChange={handleDescriptionChange}
            value={description}
            required
          ></textarea>
        </div>
        <Link
          to={`/decks/${deck.id}`}
          className="btn btn-secondary m-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
