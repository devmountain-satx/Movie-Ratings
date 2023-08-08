import { Link, useLoaderData } from 'react-router-dom';

export default function YourRatingsPage() {
  const { ratings } = useLoaderData();

  const ratingsList = ratings.map(({ ratingId, score, movie, movieId }) => {
    const { title } = movie;

    return (
      <li key={ratingId}>
        <Link to={`/movies/${movieId}`}>{title}</Link>: {score}
      </li>
    );
  });

  return (
    <>
      <div className="rating-container">
        <div className="rating-header">
          <h1>
            Find solace in the ratings promise
          </h1>
          <p>
            May your voyage through the stars and stories be filled with wonder, inspiration, and connection
          </p>
        </div>
        <div className="rating-list">
          <ul>{ratingsList}</ul>
        </div>
      </div>
    </>
  );
}
