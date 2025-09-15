import { Link } from "react-router-dom";
import "../assets/styles/home.css";

import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faShuffle);

export default function Home() {
  return (
    <div>
      <section id="head">
        <h1 id="title">
          <span>Bienvenue sur Blagues & Sourires !</span>
        </h1>
        <h2 className="subtitle">Le lieu où le rire est roi !</h2>
      </section>
      <p id="presentation">
        Vous cherchez une bonne dose de bonne humeur ? Vous êtes au bon endroit
        ! Sur Blagues & Sourires, nous avons rassemblé pour vous les meilleures
        blagues, anecdotes hilarantes et devinettes amusantes. Que vous soyez
        fan de blagues courtes, de jeux de mots, ou de bonnes vieilles histoires
        drôles, vous trouverez de quoi égayer votre journée.
      </p>
      <section id="cards">
        <Card className="z-0">
          <Card.Header>Blagues par auteur</Card.Header>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon="fa-regular fa-user" />
            </Card.Title>
            <Card.Text>
              Vous avez un humoriste préféré ? Retrouvez facilement toutes ses
              blagues dans notre rubrique dédiée.
            </Card.Text>
            <Link to={`/authors`} className="nav-button">
              Blagues par auteur
            </Link>
          </Card.Body>
        </Card>
        <div className="text fw-light">OU</div>
        <Card className="z-0">
          <Card.Header>Toutes les blagues</Card.Header>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon="fa-solid fa-shuffle" />
            </Card.Title>
            <Card.Text>
              Sinon, vous pouvez également vous divertir en jetant un oeil aux
              dernières blagues ajoutées au catalogue.
            </Card.Text>
            <Link to={`/jokes`} className="nav-button">
              Blagues au hasard
            </Link>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}
