import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCreditsById } from "../../videos-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    setError(false);
    getCreditsById(movieId)
      .then((data) => setCast([...data]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {cast && (
        <ul className={css.container}>
          {cast.map((item) => (
            <li key={item.id} className={css.item}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : defaultImg
                }
                width={150}
                alt={item.name}
              />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
