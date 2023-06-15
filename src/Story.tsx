import { useState } from "react";
import { Comments } from "./Comment";
import { timeAgo } from "./utils/time-age-calculator";

export default function Story({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const [toggleComments, setToggleComments] = useState(false);

  const handleComments = () => {
    setToggleComments(!toggleComments);
  };

  return (
    <div className="story">
      <div className="story-group">
        <span>{`${index + 1}. `}</span>
        <div className="story-body">
          <label>
            {story.title}&nbsp;
            <a href={story.url} target="_blank">
              <span>({story.url})</span>
            </a>
          </label>

          <small>
            {`${story.score} points by ${story.by} ${timeAgo(story.time)}`}
            {story.kids && story.kids.length > 0 ? (
              <>
                &nbsp;|&nbsp;
                <span
                  onClick={() => handleComments()}
                >{`${story.kids.length} comments`}</span>
              </>
            ) : (
              ""
            )}
          </small>

          {toggleComments && story.kids && story.kids.length > 0 && (
            <Comments kids={story.kids} />
          )}
        </div>
      </div>
    </div>
  );
}
