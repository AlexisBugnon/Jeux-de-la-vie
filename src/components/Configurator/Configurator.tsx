import './Configurator.scss';

function Configurator({
  play,
  setPlay,
  cycleSpeed,
  setCycleSpeed,
}: {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  cycleSpeed: number;
  setCycleSpeed: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="configurator">
      <div className="container">
        <button
          className={play ? 'cycle cycle--playing' : 'cycle cycle--stoped'}
          type="button"
          onClick={() => {
            setPlay(!play);
          }}
        >
          {play ? 'Stop' : 'Play'}
        </button>
        <div className="container-range-iteration">
          <p>nombre de cycles par seconde:</p>
          <input
            className="range-iteration"
            type="range"
            min="1"
            max="20"
            step={1}
            defaultValue={1}
            onChange={(event) => {
              const valueRange = parseInt(event.target.value, 10);
              setCycleSpeed(1000 / valueRange);
            }}
          />
          <p>{1000 / cycleSpeed} cycles/seconde</p>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
