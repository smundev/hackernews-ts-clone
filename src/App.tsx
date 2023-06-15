import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Story from "./Story";
import { RingLoader } from "react-spinners";
import { useState } from "react";

const GET_TOP_STORIES = gql`
  query GetTopStories($offset: Int, $limit: Int) {
    GetTopStories(offset: $offset, limit: $limit) {
      id
      by
      kids
      time
      title
      type
      url
      score
    }
  }
`;

const PAGINATION_LIMIT = 100;
enum PAGINATION_DIRECTION {
  NEXT = "NEXT",
  PREVIOUS = "PREVIOUS",
}

function App() {
  const [offset, setOffset] = useState(0);
  const { data, loading } = useQuery(GET_TOP_STORIES, {
    variables: { offset, limit: PAGINATION_LIMIT },
  });

  const handleOffset = (direction: PAGINATION_DIRECTION) => {
    setOffset((prev) => {
      if (direction === PAGINATION_DIRECTION.PREVIOUS) return prev - 1;
      if (direction === PAGINATION_DIRECTION.NEXT) return prev + 1;
      return prev;
    });
  };

  return (
    <>
      <main className="container">
        <header className="header">
          <a href="/">
            <img src="/y18.svg" alt="hacker news logo" />
          </a>
          <a href="/">
            <strong>Hacker News</strong>
          </a>
        </header>
        <section className="story-container">
          {data?.GetTopStories.map((item: Story, i: number) => (
            <Story
              key={item.id}
              story={item}
              index={offset * PAGINATION_LIMIT + i}
            />
          ))}
        </section>
        {loading && (
          <div className="loader">
            {<RingLoader size={50} color="#ff6600" />}
          </div>
        )}
        {!loading && (
          <div className="page-button-group">
            {offset !== 0 && (
              <button
                role="button"
                className="load-more"
                onClick={() => handleOffset(PAGINATION_DIRECTION.PREVIOUS)}
              >
                Previous
              </button>
            )}
            {data?.GetTopStories.length !== 0 && (
              <button
                role="button"
                className="load-more"
                onClick={() => handleOffset(PAGINATION_DIRECTION.NEXT)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
