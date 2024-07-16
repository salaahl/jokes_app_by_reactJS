import { CSSTransition } from 'react-transition-group';

export default function Loader(props) {
  return (
    <div>
      <CSSTransition
        in={props.in}
        nodeRef={props.contentRef}
        timeout={1500}
        classNames="component"
        unmountOnExit
      >
        <div className="page-loader" ref={props.contentRef}>
          <div className="loader"></div>
        </div>
      </CSSTransition>
    </div>
  );
}
