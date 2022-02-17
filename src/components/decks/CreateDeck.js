import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import FormDeck from "./FormDeck";

function CreateDeck() {
  const history = useHistory();                                                     // obtains access to browser history controls

  function handleSubmit(newDeck) {                                                  // handles submit of deck form then redirects
    createDeck(newDeck).then((result) => history.push(`/decks/${result.id}`));
  }

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
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <FormDeck handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateDeck;