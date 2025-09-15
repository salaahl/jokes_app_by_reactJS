import { forwardRef } from "react";
import { CSSTransition } from "react-transition-group";

const Loader = forwardRef((props, ref) => {
  return (
    <CSSTransition
      in={true}
      nodeRef={ref}
      timeout={1500}
      classNames="component"
      unmountOnExit
    >
      <div className="page-loader" ref={ref}>
        <div className="loader"></div>
      </div>
    </CSSTransition>
  );
});

export default Loader;
