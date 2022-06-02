const QueueMusic = ({queue}) => {

    return(
        <div>
            <h6>{queue.index}</h6>
            <h5>{queue.name}</h5>
        </div>
    );
};

export default QueueMusic;
