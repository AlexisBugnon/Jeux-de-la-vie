import { useEffect, useRef } from 'react';
import ICell from '../../@types/cell';
import IGrid from '../../@types/grid';
import './Configurator.scss';

function Configurator({
  play,
  setPlay,
  cycleSpeed,
  setCycleSpeed,
  setAliveCells,
  gridState,
  setGridState,
}: {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  cycleSpeed: number;
  setCycleSpeed: React.Dispatch<React.SetStateAction<number>>;
  setAliveCells: React.Dispatch<React.SetStateAction<ICell>>;
  gridState: IGrid;
  setGridState: React.Dispatch<React.SetStateAction<IGrid>>;
}) {
  const resetGrid = () => {
    setPlay(false);
    setAliveCells((prev) => {
      return { ...prev, cells: [] };
    });
  };
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
            defaultValue={10}
            onChange={(event) => {
              const valueRange = parseInt(event.target.value, 10);
              setCycleSpeed(1000 / valueRange);
            }}
          />
          <p>{1000 / cycleSpeed} cycles/seconde</p>
        </div>
        <button type="button" className="reset-grid" onClick={resetGrid}>
          Réinitialiser la grille
        </button>
        <div className="container-range-iteration">
          <p>taille de la grille :</p>
          <input
            className="range-iteration"
            type="range"
            min="20"
            max="100"
            step={5}
            defaultValue={50}
            onChange={(event) => {
              const newGridState = { ...gridState };
              newGridState.numberColumn = parseInt(event.target.value, 10);
              newGridState.numberLine = parseInt(event.target.value, 10);
              setGridState(newGridState);
            }}
          />
          <p>{`${gridState.numberColumn}x${gridState.numberLine}`}</p>
        </div>
        <div className="container-range-iteration">
          <p>taille des cellules:</p>
          <input
            className="range-iteration"
            type="range"
            min="5"
            max="15"
            step={1}
            defaultValue={15}
            onChange={(event) => {
              const newGridState = { ...gridState };
              newGridState.sizeCells = parseInt(event.target.value, 10);
              setGridState(newGridState);
            }}
          />
          <p>{`${gridState.sizeCells} pixels`}</p>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
