import IGrid from '../../@types/grid';
import './Grid.scss';

function Grid({
  gridState,
  setGridState,
}: {
  gridState: IGrid;
  setGridState: React.Dispatch<React.SetStateAction<IGrid>>;
}) {
  const cellsCompo = [];
  const createCell = () => {
    gridState.cells.forEach((cell, index) => {
      cellsCompo.push(
        // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/interactive-supports-focus
        <div
          className={cell.alive ? 'cell cell--alive' : 'cell'}
          key={index}
          role="button"
          onMouseDown={() => {
            const newGridState = { ...gridState };
            newGridState.cells[cell.i].alive = true;
            setGridState(newGridState);
          }}
        />
      );
    });
    return cellsCompo;
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}rem)`,
    gridTemplateRows: `repeat(${gridState.numberColumn}, ${gridState.sizeCells}rem)`,
  };

  return (
    <div className="grid" style={gridStyle}>
      {createCell()}
    </div>
  );
}

export default Grid;
