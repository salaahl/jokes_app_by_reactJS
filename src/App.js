import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { routes } from "./index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Loader from "./components/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeftLong, faSmile);

export default function App() {
  const location = useLocation();
  const navigation = useNavigation(); // Va gérer les états de navigation (parge en chargement, page chargéee...)
  const navigate = useNavigate(); // Et lui me permettre d'aller d'une page à l'autre
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div id="App">
      <header id="App-header">
        {location.key !== "default" ?? (
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        )}
        <Link to={`/`}>
          <FontAwesomeIcon
            icon="fa-regular fa-face-smile"
            id="App-logo"
            alt="logo"
          />
          <h2>
            Blagues & <span className="fw-light">Sourires</span>
          </h2>
        </Link>
      </header>

      <main id="App-main">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {navigation.state === "loading" ? <Loader /> : currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>

      <footer id="App-footer" className="w-full py-4">
        <div className="flex flex-wrap justify-center items-center max-w-screen-xl py-4 rounded-lg overflow-hidden">
          <nav className="flex flex-wrap justify-center">
            <div className="px-2 md:px-6">
              <Link to={`/`} className="text-gray-500 hover:text-gray-900">
                À propos de nous
              </Link>
            </div>
            <div className="px-2 md:px-6">
              <Link to={`/`} className="text-gray-500 hover:text-gray-900">
                Mentions légales
              </Link>
            </div>
          </nav>
          <div className="px-2 md:px-6 text-sm text-center text-gray-500 hover:text-gray-900">
            <a
              href="https://www.linkedin.com/in/salaha-sokhona/"
              target="_blank"
              rel="noreferrer"
            >
              © 2024 Salaha Sokhona. Tous droits réservés.
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
