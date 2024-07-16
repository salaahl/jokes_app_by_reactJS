import { Link } from 'react-router-dom';
import '../../assets/styles/home.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faShuffle);

export default function Home() {
  return (
    <div>
      <section id="head">
        <h1>Bienvenue sur Blagues & Sourires !</h1>
        <h3>Le lieu où le rire est roi !</h3>
      </section>
      <p id="presentation">
        Vous cherchez une bonne dose de bonne humeur ? Vous êtes au bon endroit
        ! Sur Blagues & Sourires, nous avons rassemblé pour vous les meilleures
        blagues, anecdotes hilarantes et devinettes amusantes. Que vous soyez
        fan de blagues courtes, de jeux de mots, ou de bonnes vieilles histoires
        drôles, vous trouverez de quoi égayer votre journée.
      </p>
      <section id="cards">
        <Card>
          <Card.Header>Blagues par auteur</Card.Header>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon="fa-regular fa-user" />
            </Card.Title>
            <Card.Text>
              Vous avez un humoriste préféré ? Retrouvez facilement toutes ses
              blagues dans notre rubrique dédiée.
            </Card.Text>
            <Button variant="dark">
              <Link to={`/authors`}>Blagues par auteur</Link>
            </Button>
          </Card.Body>
        </Card>
        <div className="fw-light">OU</div>
        <Card>
          <Card.Header>Blagues au hasard</Card.Header>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon="fa-solid fa-shuffle" />
            </Card.Title>
            <Card.Text>
              Besoin d'une surprise ? Laissez le hasard choisir pour vous et
              découvrez une blague aléatoire qui vous fera sourire.
            </Card.Text>
            <Button variant="dark">
              <Link to={`/jokes`}>Blagues au hasard</Link>
            </Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}
