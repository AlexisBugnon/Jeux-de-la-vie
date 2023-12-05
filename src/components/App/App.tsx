import { useState } from 'react';
import logo from '../../assets/logo.svg';
import Grid from '../Grid/Grid';

import './App.scss';

function App() {
  const defaultGrid = {
    numberLine: 20,
    numberColumn: 20,
    sizeCells: 2,
    cells: null,
  };

  // const [numberLineGrid, setNumberLineGrid] = useState(10);
  // const [numberColumnGrid, setNumberColumnGrid] = useState(10);
  const [gridState, setGridState] = useState(defaultGrid);

  return (
    <div className="App">
      <Grid gridState={gridState} />
    </div>
  );
}

export default App;
