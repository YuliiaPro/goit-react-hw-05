import { useEffect, useState, Suspense } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { getVideosById } from "../../videos-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieCard from "../../components/MovieCard/MovieCard";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    setError(false);
    getVideosById(movieId)
      .then((data) => setMovie(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && <MovieCard movie={movie} />}
      <div className={css.add}>
        <p>Additional information</p>
        <ul className={css.list}>
          <li>
            <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading sub components...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
