import { Link, useLoaderData } from 'react-router-dom';

export const fetchAuthors = async () => {
  try {
    const f = await fetch('https://127.0.0.1:8000/api/authors');
    const response = await f.json();
    return response['hydra:member'];
  } catch (error) {
    console.error('Erreur lors de la récupération des auteurs :', error);
  }
};

export function Authors() {
  // Le loader data est défini dans la route et va récupérer la fonction fetchAuthors en faisant la transition
  const authors = useLoaderData();

  if (authors.isLoading) {
    return <div>Chargement...</div>;
  }

  if (authors.isError) {
    return <div>Erreur lors du chargement.</div>;
  }
  return (
    <div>
      <h1>Authors</h1>
      <div id="authors">
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`./${author.id}/jokes`}>{author.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}
