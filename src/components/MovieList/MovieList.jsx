import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieList.module.css";

export default function MovieList({ videos }) {
  return (
    <ul className={css.link}>
      {videos.map((item) => (
        <li key={item.id} className={css.list}>
          <MovieItem video={item} />
        </li>
      ))}
    </ul>
  );
}
