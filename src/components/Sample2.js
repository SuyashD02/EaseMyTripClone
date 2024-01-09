import axios from "axios";
import React, { useEffect, useState } from "react";
import _debounce from "lodash/debounce";

const Sample2 = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);

  const config = {
    headers: {
      projectID: "7k1ct68pbbmr",
    },
  };

  const fetchData = async () => {
    if (isFetching || (initialApiCallMade && page > 1)) {
      return;
    }

    try {
      setIsFetching(true);
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/post?limit=10&page=${page}`,
        config
      );

      setData((prevData) => [...prevData, ...res.data.data]);
      setPage((prevPage) => prevPage + 1);

      if (!initialApiCallMade) {
        setInitialApiCallMade(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = _debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchData();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      {data.length > 0 &&
        data.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={item.author.profileImage}
                alt="author Image"
                style={{ width: "3rem" }}
              />
              <h5>{item.channel.name}</h5>
              <p>{item.content}</p>
              <img src={item.channel.image} width={650} alt="channel Image" />
              <p>likeCount: {item.likeCount}</p>
              <p>comments: {item.commentCount}</p>
            </div>
          </div>
        ))}
      {isFetching && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Sample2;
