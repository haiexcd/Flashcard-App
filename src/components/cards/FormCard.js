import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

function FormCard({handleSubmit}) {
  const { url } = useRouteMatch();
  const { deckId, cardId } = useParams();                                           // grabs the deckId and cardId from the URL 
  const [deck, setDeck] = useState({});                                             // sets the states of deck, isEdit, front, back, and placeholders for both
  const [isEdit, setIsEdit] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontPlaceholder, setFrontPlaceholder] = useState("Front side of card");
  const [backPlaceholder, setBackPlaceholder] = useState("Back side of card");


  useEffect(() => {                                                                 // useEffect sets all necessary states of the deck for form inputs
    if (url.includes("edit")) {
      setIsEdit(true);
      readCard(cardId).then((response) => {
        setFrontPlaceholder(response.front);
        setBackPlaceholder(response.back);
        setFront(response.front);
        setBack(response.back);
      });
    }
  }, [frontPlaceholder, backPlaceholder, url, cardId, setFront, setBack]);

  useEffect(() => {                                                                 // useEffect sets all necessary states of the deck after reading the deck from API
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function handleFrontChange(event) {                                               // handles front and back of card change
    setFront(event.target.value);
  }
  function handleBackChange(event) {
    setBack(event.target.value);
  }

  function onCardSubmit (event) {                                                   // handles the submit event of the form
    event.preventDefault();
    handleSubmit(front, back, setFront, setBack);
  }
  
  return (
    <form onSubmit={onCardSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder={frontPlaceholder}
          onChange={handleFrontChange}
          value={front}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="Back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder={backPlaceholder}
          onChange={handleBackChange}
          value={back}
          required
        ></textarea>
      </div>
      {isEdit ? (
        <>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </>
      ) : (
        <>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
            Done
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </>
      )}
    </form>
  );
}

export default FormCard;