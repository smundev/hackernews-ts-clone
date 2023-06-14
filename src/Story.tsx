export default function Story({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const handleComments = (comments: number[]) => {
    console.log("clicked", comments);
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
            {`${story.score} points by ${story.by} 3 hours ago`}
            {story.kids && story.kids.length > 0 ? (
              <>
                &nbsp;|&nbsp;
                <span
                  onClick={() => handleComments(story.kids)}
                >{`${story.kids.length} comments`}</span>
              </>
            ) : (
              ""
            )}
          </small>
        </div>
      </div>
    </div>
  );
}
