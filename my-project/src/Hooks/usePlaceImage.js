import { useEffect, useState } from "react";

const ACCESS_KEY = "7IumigsVYsLtzTgrTULz0clj5Yv_YlYE1xydk48TaUM"; // put inside .env later

const usePlaceImage = (placeName) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeName) return;

    const fetchImage = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            placeName
          )}&per_page=1&client_id=${ACCESS_KEY}`
        );

        const data = await response.json();

        // We only need ONE image
        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular);
        } else {
          setImageUrl(null);
        }

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [placeName]);

  return { imageUrl, loading, error };
};

export default usePlaceImage;
