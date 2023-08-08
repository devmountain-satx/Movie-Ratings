import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="error-container">
        <div className='error-message'>
          <h2>
            Lost in the Cinematic Cosmos!
          </h2>
          <p>
            Uh-oh! It seems like you've wandered into uncharted cinematic territory. The path you're seeking appears to have gone astray amidst the stars and stories of our movie universe

          </p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <button onClick={() => window.history.back()}>
            🎬 Return to the stars of cinema →
          </button>
        </div>
        <div className="error-image">
          <img 
            src="https://cdn.discordapp.com/attachments/951197655021797436/1138307012866875472/1950s.png"
            alt="Error" />
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
