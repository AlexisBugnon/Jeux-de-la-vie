import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import Grid from '../Grid/Grid';

import './App.scss';
import IGrid from '../../@types/grid';
import Configurator from '../Configurator/Configurator';
import ICell from '../../@types/cell';

function App() {
  const defaultGrid = {
    numberLine: 100,
    numberColumn: 100,
    sizeCells: 10,
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
    gridState.cellsAlive.forEach((cell: ICell) => {
      indexNeighbors.forEach((index) => {
        if (cellsWithNeightbors[cell.i + index]) {
          cellsWithNeightbors[cell.i + index].neighbors += 1;
        } else {
          cellsWithNeightbors[cell.i + index] = {
            i: cell.i + index,
            alive: false,
            neighbors: 1,
          };
        }
      });
    });

    const newGridState = { ...gridState };
    cellsWithNeightbors.forEach((cell) => {
      if (cell.neighbors === 3) {
        newGridState.cells[cell.i].alive = true;
        newGridState.cellsAlive[cell.i] = {
          i: cell.i,
          alive: true,
          neighbors: 0,
        };
      } else if (cell.neighbors <= 1 || cell.neighbors > 3) {
        console.log('dans le die');
        newGridState.cells[cell.i].alive = false;
        delete newGridState.cellsAlive[cell.i];
      }
    });

    newGridState.cellsAlive.forEach((cell) => {
      if (!cellsWithNeightbors[cell.i]) {
        newGridState.cells[cell.i].alive = false;
        delete newGridState.cellsAlive[cell.i];
      }
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
