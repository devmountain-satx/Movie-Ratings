import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Movie, User } from './model.js';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

function loginRequired(req, res, next) {
    if (!req.session.userId) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        next();
    }
}

app.get('/api/movies', async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
});

app.get('/api/movies/:movieId', async (req, res) => {
    const { movieId } = req.params;
    const movie = await Movie.findByPk(movieId);
    res.json(movie);
});

app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email:email } });

    if (user && user.password === password) {
        req.session.user_Id = user.user_Id;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/api/logout', loginRequired, (req, res) => {   
    req.session.destroy();
    res.json({ success: true });
});

app.get('/api/ratings', loginRequired, async (req, res) => {
    const { user_Id } = req.session;
    
    const user = await User.findByPk(user_Id);
    const ratings = await user.getRatings({ 
        include: {
            model: Movie,
            attributes: ['title']
        },
    });
    res.json(ratings);
});

app.post('/api/ratings', loginRequired, async (req, res) => {
    const { user_Id } = req.session;
    const { movieId, score } = req.body;

    const user = await User.findByPk(user_Id);
    const rating = await user.createRating({ movieId: movieId, score: score });

    res.json(rating);
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));