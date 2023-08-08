import lodash from 'lodash';
import { Movie, Rating, User, db } from '../src/model.js';
import { movieData } from './data/movies.js';

console.log('Syncing the database!')
await db.sync({ force: true });

console.log('Seeding the database!');

const moviesInDB = await Promise.all(
    movieData.map(async (movie) => {
        const releaseDate = new Date(Date.parse(movie.releaseDate));
        const { title, overview, posterPath } = movie;

        const newMovie = Movie.create({
            title: title,
            overview: overview,
            releaseDate: releaseDate,
            posterPath: posterPath,
        });
        return newMovie;
    })
);

const usersToCreate = [];
for (let i = 0; i < 10; i++) {
  const email = `user${i}@test.com`;
  usersToCreate.push(User.create({ email: email, password: 'test' }));
}

const usersInDB = await Promise.all(usersToCreate);

const ratingsInDB = await Promise.all(
    usersInDB.flatMap((user) => {
        const randomMovies = lodash.sampleSize(moviesInDB, 10);
        
        const movieRatings = randomMovies.map((movie) => {
            return Rating.create({
                score: lodash.random(1, 5),
                userId: user.userId,
                movieId: movie.movieId,
            });
        });
        return movieRatings;
    })
);
console.log(ratingsInDB)

await db.close();
console.log('Finished seeding the database!');