import React from "react";
import { Switch, Route } from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import StudyDeck from "../components/decks/StudyDeck";
import CreateDeck from "../components/decks/CreateDeck";
import DeckOverview from "../components/decks/DeckOverview";
import EditDeck from "../components/decks/EditDeck";
import AddCard from "../components/cards/AddCard";
import EditCard from "../components/cards/EditCard";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckOverview />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
