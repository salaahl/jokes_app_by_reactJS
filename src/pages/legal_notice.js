import '../assets/styles/legal_notice.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faShuffle);

export default function LegalNotice() {
  return (
    <div>
        <h1 id="title">Mentions légales</h1>
    </div>
  );
}