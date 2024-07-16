import React, { createRef, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../assets/styles/jokes.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

import Loader from '../components/Loader';
import EndJokes from '../components/EndJokes';

library.add(faSmile);

export default function Jokes() {
  const url = window.location;
  let route;
  let page = useRef(0);
  const itemsPerPage = 15;
  let totalItems = useRef(0);
  let authorId;

  let showLoaderRef = useRef(true);
  let endRef = useRef(false);
  const contentRef = createRef();
  const nodeRef = createRef();

  const [jokes, setJokes] = useState([]); // Contient la liste des blagues
  const [index, setIndex] = useState(0);
  const [joke, setJoke] = useState({});
  const [answer, setAnswer] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [end, setEnd] = useState(endRef);

  const fetchJokes = async () => {
    page.current++;

    // Cas 1 : pas de paramètre renseigné donc blague random
    if (url.pathname === '/jokes') {
      route =
        'https://127.0.0.1:8000/api/jokes?page=' +
        page.current +
        '&itemsPerPage=' +
        itemsPerPage;
    }

    // Cas 2 : paramètre de l'auteur renseigné dans l'url DONC blague reliée à un auteur
    else {
      authorId = url.href.split('/')[4];
      route = 'https://127.0.0.1:8000/api/authors/' + authorId + '?jokes';
    }

    try {
      fetch(route)
        .then((response) => response.json())
        .then((data) => {
          totalItems.current = data.jokes
            ? data.jokes.length
            : data['hydra:totalItems'];
          setJokes(data.jokes ? data.jokes : data['hydra:member']);
          console.log(data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error('Erreur lors de la sélection des blagues :', error);
    }
  };

  useEffect(() => {
    // Sera lancé au chargement de la page et à chaque fois que l'index aura été réinitialisé
    if (index === 0) {
      fetchJokes();
    }
  }, [index]);

  if (jokes.length !== 0 && jokes.length > index) {
    // Le timeout a été placé ici pour que l'animation ait le temps d'aller au bout
    setTimeout(() => {
      setJoke(jokes[index]);
      setShowJoke(true);
    }, 500);
  }

  // Si toutes les blagues chargées ont déjà été affichées :
  if (jokes.length !== 0 && index >= jokes.length) {
    if (url.pathname === '/jokes') {
      // On remet l'index à 0 et on charge une nouvelle page via le useEffect qui surveille la valeur de l'index
      setIndex(0);
    }
  }

  // Affichage du loader en ouverture de page :
  if (jokes.length !== 0 && Object.keys(joke).length !== 0) {
    showLoaderRef.current = false;
  }

  /*
   * Stock de blagues terminé même après appel au fetch :
   * Je multiplie la valeur de la page par le nombre de résultats par page (accès à la page via la route /jokes)
   * OU
   * Je compare la valeur de l'index au total des blagues chargées (accès à la page via la route authors/id/jokes)
   */
  if (
    (page.current !== 1 && page.current * itemsPerPage > totalItems.current) ||
    (index !== 0 && index === totalItems.current)
  ) {
    endRef.current = true; // On passe a la fin de partie avec le setEnd
    // Le timeout a été placé ici pour que l'animation ait le temps d'aller au bout
    setTimeout(() => {
      setShowJoke(true); // Affichera en réalité le EndJoke
    }, 500);
  }

  if (end.current === true) {
    return <EndJokes in={showJoke} nodeRef={nodeRef} componentRef={nodeRef} />;
  }

  if (showLoaderRef.current === true) {
    return (
      <Loader
        in={showLoaderRef.current}
        contentRef={contentRef}
        ref={contentRef}
      />
    );
  }

  return (
    <div ref={contentRef}>
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
                    setShowJoke(false),
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
