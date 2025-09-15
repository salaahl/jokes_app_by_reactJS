import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { forwardRef } from "react";
import "../assets/styles/jokes.css";

const EndJokes = forwardRef((props, ref) => {
  return (
    <div>
      <CSSTransition
        in={true}
        nodeRef={ref}
        timeout={1500}
        classNames="component"
        unmountOnExit
      >
        <div className="joke-container" ref={ref}>
          <div>Plus de blagues à venir...</div>
          <Link
            to={`/authors`}
            className="block mt-8 mx-auto text-center underline decoration-[4px] decoration-[deeppink]"
          >
            Aller à la liste des auteurs
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
});

export default EndJokes;
