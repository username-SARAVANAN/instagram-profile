import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore,setHasMore]=useState(true);
  const [urlFetch, setUrlFetch] = useState("");

  useEffect(() => {
    setUrlFetch(url);
  }, [url]);

  useEffect(() => {
    const fetchData = async (url) => {
      setIsLoading(true);
      setError(null);
      console.log(url);
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, 1000);
    //   });
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setData(json);
          if(json.length<36){
            setHasMore(false);
          }
        } else {
          throw new Error(json.message || "An error occurred");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      }

      setIsLoading(false);
    };

    urlFetch&&fetchData(urlFetch);
  }, [urlFetch]);

  return { data, isLoading, error, hasMore };
}
