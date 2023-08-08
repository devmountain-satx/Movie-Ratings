import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import CreateRatingForm from "../components/CreateRatingForm";

export default function MovieDetailPage() {  
    const {
        movie: { title, posterPath, overview, movieId }, 
    } = useLoaderData();
    const navigate = useNavigate();

    const handleCreateRating = async (e, { score }) => {
        e.preventDefault();

        const res = await axios.post('/api/ratings', { score: score, movieId: movieId });
        if (res.data) {
            navigate('/me');
        }
    }

    return (
        <>
        <div className="movie-details">
            <div className="movie-card">
                <div className="movie-card-body">
                    <h1>{title}</h1>
                    <p>{overview}</p>
                    <h2> Rate this movie </h2>
                    <CreateRatingForm onCreateRating={handleCreateRating} />
                </div>
                <div className="movie-card-image">
                    <img src={posterPath} alt={title} />
                </div>
            </div>
        </div>
        </>
    );
}