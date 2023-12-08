import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import Grid from '../Grid/Grid';

import './App.scss';
import IGrid from '../../@types/grid';

function App() {
  const defaultGrid = {
    numberLine: 20,
    numberColumn: 20,
    sizeCells: 2,
    cells: [],
  };

  const [gridState, setGridState] = useState<IGrid>(defaultGrid);

  const createCellsArray = () => {
    const cellsArray = [];
    for (let line = 0; line < gridState.numberLine + 1; line += 1) {
      for (let column = 0; column < gridState.numberColumn; column += 1) {
        // cellsArray[`${line}.${column}`] = { x: column, y: line, alive: false };
        // cellsArray.push({ x: column, y: line, alive: false });
        const indexString = `${line}${column}`;
        const index = parseInt(indexString, 10);
        cellsArray[index] = { i: index, x: column, y: line, alive: false };
      }
    }
    const updatedGrid = { ...defaultGrid };
    updatedGrid.cells = cellsArray;
    setGridState(updatedGrid);
  };

  useEffect(() => {
    createCellsArray();
  },[]);

  return (
    <div className="App">
      <Grid gridState={gridState} setGridState={setGridState} />
    </div>
  );
}

export default App;
