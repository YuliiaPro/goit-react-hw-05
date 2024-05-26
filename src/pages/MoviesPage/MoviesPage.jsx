import { useEffect, useState } from "react";
import { getVideos } from "../../videos-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("movie");
  useEffect(() => {
    if (!searchQuery) return;

    async function fetchVideos() {
      try {
        setError(false);
        setLoading(true);
        const { results } = await getVideos(searchQuery);
        setVideos([...results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [searchQuery]);

  const handleSubmit = async (topic) => {
    searchParams.set("movie", topic);
    setSearchParams(searchParams);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSubmit}></SearchBar>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {videos.length > 0 && <MovieList videos={videos} />}
    </div>
  );
}
