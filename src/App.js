import { routes } from './index';
import { Link, useLocation, useNavigation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

library.add(faSmile);

function LoadingScreen() {
  return (
    <div className="page-loader">
      <div className="loader"></div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigation = useNavigation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <div id="App">
      <header id="App-header">
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
                {navigation.state === 'loading' ? (
                  <LoadingScreen />
                ) : (
                  currentOutlet
                )}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>

      <footer id="App-footer"></footer>
    </div>
  );
}
