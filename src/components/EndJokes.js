import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../assets/styles/jokes.css';

export default function EndJokes(props) {
  return (
    <div>
      <CSSTransition
        in={props.in}
        nodeRef={props.nodeRef}
        timeout={1500}
        classNames="component"
        unmountOnExit
      >
        <div className="joke-container" ref={props.componentRef}>
          <div>Plus de blagues à venir...</div>
          {window.location.pathname !== '/jokes' ?? (
            <Link to={`/jokes`}>Blagues randoms</Link>
          )}
          <Link to={`/authors`}>Aller à la liste des auteurs</Link>
        </div>
      </CSSTransition>
    </div>
  );
}
