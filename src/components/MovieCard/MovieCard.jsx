import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import css from "./MovieCard.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCard({
  movie: { poster_path, vote_average, title, release_date, overview, genres },
}) {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  return (
    <div className={css.container}>
      <button className={css.btn}>
        <MdOutlineKeyboardBackspace />
        <Link to={backLinkRef.current} className={css.link}>
          Go back
        </Link>
      </button>
      {/* <p className={css.btn}>
        <Link to={backLinkRef.current}>Go back</Link>
      </p> */}
      <div className={css.card}>
        <img
          className={css.image}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt={title}
        />
        <div className={css.info}>
          <p>
            <b>
              {title} ({release_date.split("-")[0]})
            </b>
          </p>
          <p>User Score: {(vote_average * 10).toFixed(2)}%</p>
          <p>
            <b>Overview</b>
          </p>
          <p>{overview}</p>
          <p>
            <b>Genres</b>
          </p>
          <ul className={css.list}>
            {genres.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
