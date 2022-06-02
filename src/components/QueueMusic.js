import "../styles/QueueMusic.css";

const QueueMusic = ({ queue, currentIndex, item }) => {
  console.log(currentIndex);
  return (
    <div className="queue-main">
      <div className={currentIndex === item ? "active-queue" : undefined}>
        <div className="queue-card">
          <div className="queue-img-container">
            <img
              src={
                queue.coverArt
                  ? `http://localhost:3000/${queue.coverArt.slice(6)}`
                  : ""
              }
              className="queue-image"
            />
          </div>
          <div className="queue-details">
            <div className="queue-title">{queue.name}</div>
            <div className="queue-artist">{queue.genre}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueMusic;
