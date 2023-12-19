/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { CSSProperties } from 'react';
import ICell from '../../@types/cell';
import './Grid.scss';

function Grid({
  divToDisplay,
  gridStyle,
  aliveCells,
}: {
  divToDisplay: JSX.Element[] | undefined;
  gridStyle: CSSProperties | undefined;
  aliveCells: ICell;
}) {
  let divDefault: JSX.Element[] = [];
  if (divToDisplay) {
    // ici utilisation de .slice plutot que divDefault = [...divToDisplay] car
    // slice est performant sur firefox et chrome
    divDefault = divToDisplay.slice();
    if (aliveCells.cells.length > 0) {
      aliveCells.cells.forEach((_, index: number) => {
        if (index < divDefault.length) {
          divDefault[index] = (
            <div className="cell cell--alive" key={index} role="button" />
          );
        }
      });
    }
  }

  return (
    <div className="container">
      <div className="grid" style={gridStyle}>
        {divDefault}
      </div>
    </div>
  );
}

export default Grid;
