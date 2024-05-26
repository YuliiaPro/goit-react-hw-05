import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrendingVideos } from "../../videos-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchTrendingVideos() {
      try {
        setError(false);
        setloading(true);
        const { response } = await getTrendingVideos();
        setTrendingVideos([...response]);
      } catch (error) {
        setError(true);
      } finally {
        setloading(false);
      }
    }
    fetchTrendingVideos();
  }, []);
  return (
    <div className={css.container}>
      <h2>Trending today</h2>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList videos={trendingVideos} />
      <Link to="/movies/" state={location}></Link>
    </div>
  );
}
