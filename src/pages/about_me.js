import '../assets/styles/about_me.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faShuffle);

export default function AboutMe() {
  return (
    <div>
        <h1>A propos de moi</h1>
    </div>
  );
}