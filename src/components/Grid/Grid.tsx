import IGrid from '../../@types/grid';
import Cell from '../Cell/Cell';
import './Grid.scss';

function Grid({ gridState }: { gridState: IGrid }) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}rem)`,
    gridTemplateRows: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}rem)`,
  };

  const numberOfCells = gridState.numberColumn * gridState.numberLine;

  return (
    <div className="grid" style={gridStyle}>
      {Cell(numberOfCells)}
    </div>
  );
}

export default Grid;
