/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import ICell from '../../@types/cell';
import IGrid from '../../@types/grid';
import './Grid.scss';

function Grid({
  gridState,
  setGridState,
}: {
  gridState: IGrid;
  setGridState: React.Dispatch<React.SetStateAction<IGrid>>;
}) {
  const createCell = () => {
    const cellsCompo = gridState.cells.map((cell, index) => {
      return (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/interactive-supports-focus
        <div
          className={cell.alive ? 'cell cell--alive' : 'cell'}
          key={index}
          role="button"
          onMouseDown={() => {
            const newGridState = { ...gridState };
            newGridState.cells[cell.i].alive = true;
            newGridState.cellsAlive[cell.i] = cell;
            setGridState(newGridState);
          }}
        />
      );
    });

    return cellsCompo;
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
    gridTemplateRows: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}px)`,
  };

  return (
    <div className="container">
      <div className="grid" style={gridStyle}>
        {createCell()}
      </div>
    </div>
  );
}

export default Grid;
