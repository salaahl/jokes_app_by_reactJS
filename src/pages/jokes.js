import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigation,
  useOutlet,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../assets/styles/jokes.css';
import { routes } from '../index';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

library.add(faSmile);

let jokesIndexes = [];

export const fetchJokes = async () => {
  const url = window.location.href;
  let route;

  // Cas 1 : paramètre de l'auteur renseigné dans l'url DONC blague reliée à un auteur
  if (url.split('/')[3] === 'authors') {
    let authorId = url.split('/')[4];
    route = 'https://127.0.0.1:8000/api/authors/' + authorId + '?jokes';
  }

  // Cas 2 : pas de paramètre renseigné donc blague random
  else {
    route = 'https://127.0.0.1:8000/api/jokes/';
  }

  try {
    const f = await fetch(route);
    const response = await f.json();

    // Alimentation du jokesIndexes
    let temp = [];
    for (let i = 0; i < response.jokes.length; i++) {
      temp.push(i);
      // Permet de mélanger les résultats du tableau
      jokesIndexes = temp.sort((a, b) => 0.5 - Math.random());
    }

    return response.jokes;
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague :', error);
  }
};

export function Jokes() {
  // Le loader data est défini dans la route et va récupérer la fonction fetchJokes en faisant la transition
  const jokes = useLoaderData();
  let [index, setIndex] = useState(0);
  const [joke, setJoke] = useState({});
  let [answer, setAnswer] = useState(false);

  const [showJoke, setshowJoke] = useState(false);
  const nodeRef = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (jokesIndexes.length >= index) {
        setJoke(jokes[jokesIndexes[index]]);
      }
      setshowJoke(true);
    }, 500);
  }, [showJoke, jokes, index]);

  if (index >= jokesIndexes.length) {
    return (
      <div>
        <CSSTransition
          in={showJoke}
          nodeRef={nodeRef}
          timeout={1500}
          classNames="component"
          unmountOnExit
        >
          <div className="joke-container component" ref={nodeRef}>
            <div>Vous avez terminé le jeu...</div>
            <Link to={`/authors`}>Blagues randoms</Link>
            <Link to={`/authors`}>Aller à la liste des auteurs</Link>
          </div>
        </CSSTransition>
      </div>
    );
  }

  return (
    <div>
      <div className="joke-container">
        <CSSTransition
          in={showJoke}
          nodeRef={nodeRef}
          timeout={1500}
          classNames="component"
          unmountOnExit
        >
          <Card ref={nodeRef}>
            <Card.Header>Joke</Card.Header>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon="fa-regular fa-face-smile" />
              </Card.Title>
              <Card.Text>
                <span>{joke.content}</span>
                {answer === false ? (
                  <span className="answer hidden">Réponse</span>
                ) : (
                  <span className="answer">Réponse: {joke.answer}</span>
                )}
              </Card.Text>
              <div className="buttons">
                <Button variant="dark" onClick={() => setAnswer(true)}>
                  Afficher la réponse
                </Button>
                <Button
                  variant="dark"
                  onClick={() => [
                    setAnswer(false),
                    setIndex(index + 1),
                    setshowJoke(false),
                  ]}
                >
                  Nouvelle blague
                </Button>
              </div>
            </Card.Body>
          </Card>
        </CSSTransition>
      </div>
    </div>
  );
}
