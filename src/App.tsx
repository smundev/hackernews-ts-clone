import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Story from "./Story";

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
  const { data } = useQuery(GetTopStories);

  return (
    <>
      <main className="container">
        <header className="header">
          <img src="public/y18.svg" alt="hacker news logo" />
          <strong>Hacker News</strong>
        </header>
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
