import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
    const [decks, setDecks] = useState([]);                                                     // sets the state of deck
    const history = useHistory();                                                               // obtains access to browser history controls

    useEffect(() => {                                                                           // useEffect sets all necessary states of the deck after reading the deck from API
        listDecks().then(setDecks);
    }, []);

    const handleDelete = (deckId) => {                                                          // handles the delete of the deck, then redirects 
        const confirmDelete = window.confirm(
            "Delete this deck? \n\n You will not be able to recover it."
        );
        if (confirmDelete) {
            deleteDeck(deckId);
            history.go();
        }
    };
    const deckList = decks.map(({ id, name, description, cards }) => {
        return (
            <div className="card border" key={id}>
                <div className="card" key={id}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title">{name}</h5>
                            </div>
                            <div className="col">
                                <p className="float-right text-muted">{cards.length} cards</p>
                            </div>
                        </div>
                        <p className="card-text">{description}</p>
                        <Link to={`/decks/${id}`}>
                            <button type="button" className="btn btn-secondary">
                                <span className="oi oi-eye mr-2"></span>
                                View
                            </button>
                        </Link>
                        <Link to={`/decks/${id}/study`}>
                            <button type="button" className="btn btn-primary ml-3">
                                <span className="oi oi-book mr-2"></span>
                                Study
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger float-right"
                            onClick={() => handleDelete(id)}
                        >
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary mb-2">
                    <span className="oi oi-plus mr-2"></span>
                    Create Deck
                </button>
            </Link>
            {deckList}
        </div>
    );
}

export default Home;
