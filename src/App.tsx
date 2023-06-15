import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Story from "./Story";
import { RingLoader } from "react-spinners";

const GetTopStories = gql`
  query {
    GetTopStories {
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

function App() {
  const { data, loading } = useQuery(GetTopStories);

  return (
    <>
      <main className="container">
        <header className="header">
          <a href="/">
            <img src="public/y18.svg" alt="hacker news logo" />
          </a>

          <a href="/">
            <strong>Hacker News</strong>
          </a>
        </header>
        {loading && (
          <div className="loader">
            {<RingLoader size={50} color="#ff6600" />}
          </div>
        )}

        <section className="story-container">
          {data?.GetTopStories.map((item: Story, i: number) => (
            <Story key={item.id} story={item} index={i} />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
