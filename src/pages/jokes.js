import { useCallback, useEffect, useRef, useState } from "react";
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
  const page = useRef(1); // Numéro de page pour la pagination
  const totalItems = useRef(0); // Nombre total d'éléments (cas API Hydra)

  const [jokes, setJokes] = useState([]); // Stock des blagues
  const [index, setIndex] = useState(0); // Position actuelle dans le tableau de blagues
  const [joke, setJoke] = useState({}); // Blague affichée
  const [answer, setAnswer] = useState(false); // État pour la réponse (pas encore utilisé)
  const [showJoke, setShowJoke] = useState(false); // Contrôle l’affichage de la blague
  const [loading, setLoading] = useState(true); // Loader affiché au démarrage
  const [end, setEnd] = useState(false); // Fin du stock de blagues

  const contentRef = useRef(null);
  const jokeRef = useRef(null); // Référence pour l’animation de transition
  const itemsPerPage = 15; // Nombre de blagues par page

  /*
   * Fonction de récupération des blagues
   * - Soit toutes les blagues (/jokes)
   * - Soit les blagues liées à un auteur (/authors/{id}?jokes)
   */
  const fetchJokes = useCallback(async () => {
    let route;
    let authorId;

    if (url.pathname === "/jokes") {
      // Cas 1 : accès global aux blagues
      route = `https://jokes-api-platform.onrender.com/api/jokes?page=${page.current}&itemsPerPage=${itemsPerPage}`;
    } else {
      // Cas 2 : accès aux blagues d’un auteur spécifique
      authorId = url.href.split("/")[4];
      route = `https://jokes-api-platform.onrender.com/api/authors/${authorId}?jokes`;
    }

    try {
      const response = await fetch(route);
      const data = await response.json();

      // Gestion du nombre total d’éléments
      totalItems.current = data.jokes
        ? data.jokes.length
        : data["hydra:totalItems"];

      // Récupération du tableau de blagues (selon la forme renvoyée par l’API)
      const result = data.jokes ? data.jokes : data["hydra:member"];

      // Normalisation pour uniformiser la structure de l’auteur
      const normalized = result.map((j) => ({
        ...j,
        author: {
          id: j.author?.id || data.id,
          name: j.author?.name || data.name,
        },
      }));

      setJokes(normalized);
    } catch (error) {
      console.error("Erreur lors de la sélection des blagues :", error);
    }
  }, [url, itemsPerPage]);

  /*
   * Chargement des blagues
   * Déclenché à chaque fois que l’index est remis à 0
   */
  useEffect(() => {
    if (index === 0) {
      fetchJokes();
    }
  }, [index, fetchJokes]);

  /*
   * Affichage d’une nouvelle blague
   * - Dépend de la valeur de l’index
   * - Petit timeout pour laisser passer l’animation
   */
  useEffect(() => {
    if (jokes.length > index) {
      const timer = setTimeout(() => {
        setJoke(jokes[index]);
        setShowJoke(true);
        if (loading) setLoading(false); // Fin du loader au demarrage
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [jokes, index]);

  /*
   * Gestion de la pagination ou de la fin des blagues
   * - Si on atteint la fin des blagues dans /jokes → nouvelle page
   * - Si on atteint la fin dans /authors → affichage de EndJokes
   */
  useEffect(() => {
    if (jokes.length !== 0 && index >= jokes.length) {
      if (url.pathname === "/jokes") {
        // Recharge une nouvelle page
        page.current++;
        setIndex(0);
      } else if (index !== 0 && index === totalItems.current) {
        setEnd(true);
      }
    }
  }, [index, jokes, url.pathname]);

  // --- RENDER ---
  if (end) {
    return <EndJokes ref={jokeRef} />;
  }

  if (loading) {
    return <Loader />;
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
