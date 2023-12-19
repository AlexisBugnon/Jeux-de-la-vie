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
import DefaultCell from '../DefaultCell/DefaultCell';

function App() {
  const defaultGrid = {
    numberLine: 20,
    numberColumn: 20,
    sizeCells: 15,
  };

  const [aliveCells, setAliveCells] = useState<ICell>({ cells: [] });
  const [gridState, setGridState] = useState<IGrid>(defaultGrid);
  const [play, setPlay] = useState(false);
  const [cycleSpeed, setCycleSpeed] = useState(1000);
  const divToDisplay = useRef<JSX.Element[]>();
  const gridStyle = useRef<CSSProperties>();

  /*
   ** Cette fonction permet de créer la grille vierge au lancement de l'app
   */
  const createCellsArray = () => {
    divToDisplay.current = [];
    const numberOfCells = gridState.numberLine * gridState.numberColumn;
    for (let index = 0; index < numberOfCells; index += 1) {
      divToDisplay.current.push(
        <DefaultCell
          // key={index}
          index={index}
          aliveCells={aliveCells}
          setAliveCells={setAliveCells}
        />
      );
    }

    gridStyle.current = {
      gridTemplateColumns: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
      gridTemplateRows: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
    };

    setAliveCells({ cells: [] });
  };

  const updateGridState = () => {
    const cellsWithNeightbors: number[] = [];
    // Indices des voisins pour chaque cellule
    const indexNeighbors = [
      +1,
      -1,
      +gridState.numberColumn,
      -gridState.numberColumn,
      +gridState.numberColumn + 1,
      -gridState.numberColumn - 1,
      +gridState.numberColumn - 1,
      -gridState.numberColumn + 1,
    ];

    // Tableaux pour stocker les indices des cellules à mourir et à faire vivre
    const cellsTodie: number[] = [];
    const cellsToLive: number[] = [];

    // Copie de l'état actuel de la grille
    const newAliveCells = { ...aliveCells };

    // Itération sur les cellules vivantes de la grille actuelle
    aliveCells.cells.forEach((cellAlive: 1, indexAlive) => {
      // Vérification et ajout des cellules avec voisins
      if (!cellsWithNeightbors[indexAlive]) {
        cellsWithNeightbors[indexAlive] = 0;
      }
      // Itération sur les indices des voisins
      indexNeighbors.forEach((relativeIndex) => {
        // Vérification et ajout des cellules voisines
        if (!cellsWithNeightbors[indexAlive + relativeIndex]) {
          cellsWithNeightbors[indexAlive + relativeIndex] = 0;
        }
        // Vérification de l'état de la cellule voisine
        if (aliveCells.cells[indexAlive + relativeIndex]) {
          // Incrémentation du nombre de voisins pour les cellules vivantes
          cellsWithNeightbors[indexAlive] += 1;
        } else {
          // Incrémentation du nombre de voisins pour les cellules mortes
          cellsWithNeightbors[indexAlive + relativeIndex] += 1;
          // Vérification si la cellule doit prendre vie
          if (cellsWithNeightbors[indexAlive + relativeIndex] === 3) {
            cellsToLive[indexAlive + relativeIndex] = 1;
          } else if (cellsWithNeightbors[indexAlive + relativeIndex] > 3) {
            delete cellsToLive[indexAlive + relativeIndex];
          }
        }
      });
      // Vérification si la cellule doit mourir
      if (
        cellsWithNeightbors[indexAlive] <= 1 ||
        cellsWithNeightbors[indexAlive] > 3
      ) {
        cellsTodie.push(indexAlive);
      }
    });

    // Itération sur les cellules à mourir
    cellsTodie.forEach((indexCell) => {
      // Mise à jour de l'état de la cellule dans la nouvelle grille
      delete newAliveCells.cells[indexCell];
    });

    // Itération sur les cellules à faire vivre
    cellsToLive.forEach((_, indexCell) => {
      // Mise à jour de l'état de la cellule dans la nouvelle grille
      newAliveCells.cells[indexCell] = 1;
    });

    setAliveCells(newAliveCells);
  };

  useEffect(() => {
    createCellsArray();
  }, [gridState]);

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
        setAliveCells={setAliveCells}
        gridState={gridState}
        setGridState={setGridState}
      />
      <Grid
        divToDisplay={divToDisplay.current}
        gridStyle={gridStyle.current}
        aliveCells={aliveCells}
      />
    </div>
  );
}

export default App;
