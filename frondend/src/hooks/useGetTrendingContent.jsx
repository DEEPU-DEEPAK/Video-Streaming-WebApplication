import axios from "axios";
import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";

const TrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { contentType } = useContentStore();

  useEffect(() => {
    if (!contentType) return; 

    const getTrendingContent = async () => {
      try {
        setLoading(true); 
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        if (res.data && res.data.content) {
          setTrendingContent(res.data.content); 
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load trending content"); 
      } finally {
        setLoading(false); 
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, loading, error }; 
};

export default TrendingContent;
