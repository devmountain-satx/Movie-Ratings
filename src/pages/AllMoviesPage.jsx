import { Link, useLoaderData } from "react-router-dom";
import '../css/index.css';
import '../css/reset.css';

export default function AllMoviesPage() {
    const { movies } = useLoaderData();

    const listItems = movies.map(({ movieId, title }) => (
      <li key={movieId}>
        <Link to={`/movies/${movieId}`}>
          {title}
        </Link>
      </li>
    ));

    return (
      <>
        <div className='movie-container'>
          <div className='movie-header'>
            <h2>
              Cinephiles! Embark on your cinematic voyages
            </h2>
           {/*  <p>
              As time dances forward, the torch of cinematic ratings illuminates the path for generations yet unborn.
              These ratings ensure that the legacy of cinema remains vibrant and cherished, passing on the gift of storytelling to new hearts and minds.
            </p> */}
          </div>
          <div className='movie-list'>
            <ul>
              {listItems}
            </ul>
          </div>
        </div>
      </>
    );
  }