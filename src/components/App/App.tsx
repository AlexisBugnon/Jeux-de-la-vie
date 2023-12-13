/* eslint-disable no-lonely-if */
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
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

  const createCellsArray = () => {
    const cellsArray: ICell[] = [];
    const numberOfCells = gridState.numberLine * gridState.numberColumn;
    for (let index = 0; index < numberOfCells; index += 1) {
      cellsArray[index] = { i: index, alive: false, neighbors: 0 };
    }
    const updatedGrid: IGrid = { ...defaultGrid };
    updatedGrid.cells = cellsArray;
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
      newGridState.cells[indexCell].alive = false;
      delete newGridState.cellsAlive[indexCell];
    });

    // Itération sur les cellules à faire vivre
    cellsToLive.forEach((indexCell) => {
      // Mise à jour de l'état de la cellule dans la nouvelle grille
      newGridState.cells[indexCell].alive = true;
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
  },[]);

  useEffect(() => {
    if (play) {
      const test = setInterval(() => {
        updateGridState();
      }, 250);
      return () => {
        clearInterval(test);
      };
    }
  }, [play]);

  return (
    <div className="App">
      <Configurator play={play} setPlay={setPlay} />
      <Grid gridState={gridState} setGridState={setGridState} />
    </div>
  );
}

export default App;
