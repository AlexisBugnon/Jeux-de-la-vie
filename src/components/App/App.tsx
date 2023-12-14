/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { CSSProperties, useEffect, useRef, useState } from 'react';
import Grid from '../Grid/Grid';

import './App.scss';
import IGrid from '../../@types/grid';
import Configurator from '../Configurator/Configurator';
import ICell from '../../@types/cell';

function App() {
  const defaultGrid = {
    numberLine: 50,
    numberColumn: 50,
    sizeCells: 15,
    cells: [],
    cellsAlive: [],
  };

  const [gridState, setGridState] = useState<IGrid>(defaultGrid);
  const [play, setPlay] = useState(false);
  const [cycleSpeed, setCycleSpeed] = useState(1000);
  const divToDisplay = useRef<JSX.Element[]>();
  const gridStyle = useRef<CSSProperties>();
  const mouseDown = useRef(false);

  useEffect(() => {
    const handleDown = () => {
      mouseDown.current = true;
    };
    const handleUp = () => {
      mouseDown.current = false;
    };
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  });

  const userAddCellAlive = (index: number, rifleMode = false) => {
    if (!rifleMode || (rifleMode && mouseDown.current)) {
      const newGridState = { ...gridState };
      newGridState.cellsAlive[index] = newGridState.cells[index];
      setGridState(newGridState);
    }
  };

  const createCellsArray = () => {
    divToDisplay.current = [];
    const updatedGrid: IGrid = { ...defaultGrid };
    const numberOfCells = gridState.numberLine * gridState.numberColumn;
    for (let index = 0; index < numberOfCells; index += 1) {
      updatedGrid.cells.push({ i: index, alive: false, neighbors: 0 });

      divToDisplay.current.push(
        <div
          className="cell"
          key={index}
          role="button"
          onClick={() => {
            userAddCellAlive(index);
          }}
          onMouseOver={() => {
            userAddCellAlive(index, true);
          }}
        />
      );
    }

    gridStyle.current = {
      gridTemplateColumns: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
      gridTemplateRows: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
    };

    setGridState(updatedGrid);
  };

  const updateGridState = () => {
    const cellsWithNeightbors: ICell[] = [];
    // Indices des voisins pour chaque cellule
    const indexNeighbors = [
      +1,
      -1,
      +defaultGrid.numberColumn,
      -defaultGrid.numberColumn,
      +defaultGrid.numberColumn + 1,
      -defaultGrid.numberColumn - 1,
      +defaultGrid.numberColumn - 1,
      -defaultGrid.numberColumn + 1,
    ];

    // Tableaux pour stocker les indices des cellules à mourir et à faire vivre
    const cellsTodie: number[] = [];
    const cellsToLive: number[] = [];

    // Copie de l'état actuel de la grille
    const newGridState = { ...gridState };

    // Itération sur les cellules vivantes de la grille actuelle
    gridState.cellsAlive.forEach((cellAlive: ICell) => {
      // Vérification et ajout des cellules avec voisins
      if (!cellsWithNeightbors[cellAlive.i]) {
        cellsWithNeightbors[cellAlive.i] = { ...cellAlive, neighbors: 0 };
      }
      // Itération sur les indices des voisins
      indexNeighbors.forEach((relativeIndex) => {
        // Vérification et ajout des cellules voisines
        if (!cellsWithNeightbors[cellAlive.i + relativeIndex]) {
          cellsWithNeightbors[cellAlive.i + relativeIndex] = {
            i: cellAlive.i + relativeIndex,
            alive: false,
            neighbors: 0,
          };
        }
        // Vérification de l'état de la cellule voisine
        if (gridState.cellsAlive[cellAlive.i + relativeIndex]) {
          // Incrémentation du nombre de voisins pour les cellules vivantes
          cellsWithNeightbors[cellAlive.i].neighbors += 1;
        } else {
          // Incrémentation du nombre de voisins pour les cellules mortes
          cellsWithNeightbors[cellAlive.i + relativeIndex].neighbors += 1;
          // Vérification si la cellule doit prendre vie
          if (
            cellsWithNeightbors[cellAlive.i + relativeIndex].neighbors === 3
          ) {
            cellsToLive[cellAlive.i + relativeIndex] =
              cellAlive.i + relativeIndex;
          } else if (
            cellsWithNeightbors[cellAlive.i + relativeIndex].neighbors > 3
          ) {
            delete cellsToLive[cellAlive.i + relativeIndex];
          }
        }
      });
      // Vérification si la cellule doit mourir
      if (
        cellsWithNeightbors[cellAlive.i].neighbors <= 1 ||
        cellsWithNeightbors[cellAlive.i].neighbors > 3
      ) {
        cellsTodie.push(cellAlive.i);
      }
    });

    // Itération sur les cellules à mourir
    cellsTodie.forEach((indexCell) => {
      // Mise à jour de l'état de la cellule dans la nouvelle grille
      delete newGridState.cellsAlive[indexCell];
    });

    // Itération sur les cellules à faire vivre
    cellsToLive.forEach((indexCell) => {
      // Mise à jour de l'état de la cellule dans la nouvelle grille
      newGridState.cellsAlive[indexCell] = {
        i: indexCell,
        alive: true,
        neighbors: 0,
      };
    });

    setGridState(newGridState);
  };

  useEffect(() => {
    createCellsArray();
  }, []);

  useEffect(() => {
    let test: number | undefined;
    if (play) {
      test = setInterval(() => {
        updateGridState();
      }, cycleSpeed);
    }
    return () => {
      clearInterval(test);
    };
  }, [play, cycleSpeed]);

  return (
    <div className="App">
      <Configurator
        play={play}
        setPlay={setPlay}
        cycleSpeed={cycleSpeed}
        setCycleSpeed={setCycleSpeed}
      />
      <Grid
        divToDisplay={divToDisplay.current}
        gridStyle={gridStyle.current}
        cellsAlive={gridState.cellsAlive}
      />
    </div>
  );
}

export default App;
