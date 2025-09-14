import { createRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../assets/styles/jokes.css";
import Card from "react-bootstrap/Card";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile } from "@fortawesome/free-regular-svg-icons";

import Loader from "../components/Loader";
import EndJokes from "../components/EndJokes";

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
  const jokeRef = createRef();

  const [jokes, setJokes] = useState([]);
  const [index, setIndex] = useState(0);
  const [joke, setJoke] = useState({});
  const [answer, setAnswer] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [end, setEnd] = useState(endRef);

  const fetchJokes = async () => {
    page.current++;

    // Cas 1 : pas de paramètre renseigné donc blague random
    if (url.pathname === "/jokes") {
      route =
        "https://jokes-api-platform.onrender.com/api/jokes?page=" +
        page.current +
        "&itemsPerPage=" +
        itemsPerPage;
    }

    // Cas 2 : paramètre de l'auteur renseigné dans l'url DONC blague reliée à un auteur
    else {
      authorId = url.href.split("/")[4];
      route =
        "https://jokes-api-platform.onrender.com/api/jokes?author=" + authorId;
    }

    try {
      fetch(route)
        .then((response) => response.json())
        .then((data) => {
          totalItems.current = data.jokes
            ? data.jokes.length
            : data["hydra:totalItems"];
          setJokes(data.jokes ? data.jokes : data["hydra:member"]);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Erreur lors de la sélection des blagues :", error);
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
    if (url.pathname === "/jokes") {
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
   * Je vérifie que le numéro de page est différent de 0 et que la variable est vide (accès à la page via la route /jokes)
   * OU
   * Je compare la valeur de l'index au total des blagues chargées (accès à la page via la route authors/id/jokes)
   */
  if (
    (page.current !== 0 && jokes.length === 0) ||
    (index !== 0 && index === totalItems.current)
  ) {
    endRef.current = true; // On passe a la fin de partie avec le setEnd
    // Le timeout a été placé ici pour que l'animation ait le temps d'aller au bout
    setTimeout(() => {
      setShowJoke(true); // Affichera en réalité le EndJoke
    }, 500);
  }

  if (end.current === true) {
    return <EndJokes in={showJoke} nodeRef={jokeRef} componentRef={jokeRef} />;
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
          nodeRef={jokeRef}
          timeout={1500}
          classNames="component"
          unmountOnExit
        >
          <div ref={jokeRef} className="joke-inner w-full">
            <Card className="z-0">
              <Card.Header>{joke.author.name}</Card.Header>
              <Card.Body>
                <Card.Title>
                  <img src="/laugh_icon.png" alt="ha ha" />
                </Card.Title>
                <Card.Text>
                  <span>{joke.content}</span>
                  <span className={`answer ${answer ? "" : "hidden"}`}>
                    {joke.answer}
                  </span>
                </Card.Text>
                <div className="buttons">
                  <button
                    className="nav-button"
                    onClick={() => setAnswer(true)}
                  >
                    Afficher la réponse
                  </button>
                  <button
                    className="nav-button"
                    onClick={() => [
                      setAnswer(false),
                      setIndex(index + 1),
                      setShowJoke(false),
                    ]}
                  >
                    Nouvelle blague
                  </button>
                </div>
              </Card.Body>
            </Card>
            {url.pathname === "/jokes" && (
              <Link
                to={`/authors/${joke.author.id}/jokes`}
                className="block mt-8 mx-auto text-center underline decoration-[4px] decoration-[deeppink]"
              >
                Plus de blagues de cet auteur
              </Link>
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
