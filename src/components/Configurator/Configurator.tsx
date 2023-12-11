import './Configurator.scss';

function Configurator({
  play,
  setPlay,
}: {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="configurator">
      <button
        type="button"
        onClick={() => {
          setPlay(!play);
        }}
      >
        {play ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default Configurator;
