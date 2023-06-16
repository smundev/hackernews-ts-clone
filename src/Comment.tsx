import { useQuery, gql } from "@apollo/client";
import { PulseLoader } from "react-spinners";
import { timeAgo } from "./utils/time-age-calculator";

const getComments = gql`
  query GetComments($ids: [Int]!) {
    GetComments(ids: $ids) {
      id
      by
      text
      time
      kids
    }
  }
`;

export const Comments = ({ kids }: { kids: number[] }) => {
  const { data, loading } = useQuery(getComments, {
    variables: { ids: kids },
  });

  return (
    <div>
      {loading && <PulseLoader size={10} color="#ff6600" />}
      {data?.GetComments.map((item: Story) => (
        <details className="comment" key={item.id} open>
          <summary>
            {item.by} - {timeAgo(item.time)}
          </summary>

          <div dangerouslySetInnerHTML={{ __html: item.text }} />

          {item.kids && item.kids.length > 0 && <Comments kids={item.kids} />}
        </details>
      ))}
    </div>
  );
};
