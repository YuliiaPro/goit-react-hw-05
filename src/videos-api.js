import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTAzZjdkOTQ0NTUzOGVjOWRmOGJmOWNlOTBkZjkwMyIsInN1YiI6IjY2NGY2ZGVlMzljYjEwZjdkNmRkNDk2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RYlAcUI9yJxfTLgEEKK8iHOJvb68bvGGpodzhN2qih0",
  },
};

export async function getTrendingVideos() {
  const response = await axios.get(`/trending/movie/day`, options);
  return {
    response: response.data.results,
  };
}

export async function getVideos(topic) {
  const response = await axios.get(`/search/movie`, {
    ...options,
    params: {
      query: topic,
    },
  });
  return {
    results: response.data.results,
  };
}

export async function getVideosById(movieId) {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
}

export async function getCreditsById(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
}

export async function getReviewsById(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
}
