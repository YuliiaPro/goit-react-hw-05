import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../videos-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    setError(false);
    getReviewsById(movieId)
      .then((data) => setReviews([...data]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length ? (
        <ul>
          {reviews.map((item) => (
            <li key={item.id} className={css.container}>
              <p>
                <b>{item.author}</b>
              </p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}
