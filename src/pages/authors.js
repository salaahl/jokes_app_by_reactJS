import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/authors.css";
import Loader from "../components/Loader";

export default function Authors() {
  const contentRef = useRef(null);
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const f = await fetch(
        "https://jokes-api-platform.onrender.com/api/authors"
      );
      const response = await f.json();
      setAuthors(response["hydra:member"]);
    } catch (error) {
      console.error("Erreur lors de la récupération des auteurs :", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Toujours appeler useMemo avant tout return conditionnel
  const authorsByLetter = useMemo(() => {
    return authors.reduce((acc, author) => {
      const letter = author.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(author);
      return acc;
    }, {});
  }, [authors]);

  // Afficher le loader tant que les auteurs ne sont pas chargés
  if (authors.length === 0) {
    return <Loader />;
  }

  return (
    <div ref={contentRef}>
      <h1 id="title">Auteurs</h1>
      <div id="authors">
        {Object.entries(authorsByLetter).map(([letter, authors]) => (
          <div key={letter} className="author-group">
            <h3 className="index">{letter}</h3>
            <ul className="pl-0">
              {authors.map((author) => (
                <li key={author.id}>
                  <Link to={`./${author.id}/jokes`}>{author.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
