import React, { createRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/authors.css';
import Loader from '../components/Loader';

export default function Authors() {
  let showLoaderRef = useRef(true);
  const contentRef = createRef();

  const [authors, setAuthors] = useState([]);
  let firstLetter;

  const fetchAuthors = async () => {
    try {
      const f = await fetch('https://salaha-sokhona-jokes-api-f5beaadaebe1.herokuapp.com/api/authors');
      const response = await f.json();
      setAuthors(response['hydra:member']);
    } catch (error) {
      console.error('Erreur lors de la récupération des auteurs :', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (authors.length === 0) {
    return (
      <Loader
        in={showLoaderRef.current}
        contentRef={contentRef}
        ref={contentRef}
      />
    );
  }

  if (authors.length !== 0) {
    showLoaderRef.current = false;
  }

  return (
    <div ref={contentRef}>
      <h1>Auteurs</h1>
      <div id="authors">
        {authors.map((author) => (
          <div key={author.name} className="author">
            {firstLetter !== Array.from(authors[0].name)[0] ? (
              <h3 key={author.content} className="index">
                {Array.from(author.name)[0]}
              </h3>
            ) : (
              (firstLetter = Array.from(authors[0].name)[0])
            )}
            <li key={author.id}>
              <Link to={`./${author.id}/jokes`}>{author.name}</Link>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}
