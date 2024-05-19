import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Navigation from "./Navigation";
import Button from "./UI/Button";

export default function ContentArea() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef(null);
  const lastDataRef = useRef(null);
  const location=useLocation();

  const {
    data: fetchData,
    isLoading,
    error,
    hasMore,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=36&_start=${
      pageNumber * 36
    }`
  );

  useEffect(() => {
    if(fetchData) {
      setData((prevData) => {const set=new Set([...prevData, ...fetchData]);return [...set]});
    }
  }, [fetchData]);

  useEffect(() => {
    if(lastDataRef.current){
        observer.current.disconnect();
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, options);

    if (lastDataRef.current&&hasMore&&pageNumber>=1) {
      observer.current.observe(lastDataRef.current);
    }
    ()=>{
        if(lastDataRef.current){
            observer.current.disconnect();
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData,data,hasMore]);

  return (
    <>
      <Navigation />
      {data&&<div className={location.pathname==="/reels"?"reels-area":"content-area"}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={index === data.length - 1 ? lastDataRef : null}
          >
            <img src={item.thumbnailUrl}/>
          </div>
        ))}
      </div>}
      {(data.length<=36&&data.length>0&&pageNumber<1)&&<Button onClick={()=>setPageNumber(prev=>prev+1)} cssClass="bg-blue rounded">Show More</Button>}
      {isLoading && <div className="loader"></div>}
      {error && <div className="error">{error.message}</div>}
    </>
  );
}
