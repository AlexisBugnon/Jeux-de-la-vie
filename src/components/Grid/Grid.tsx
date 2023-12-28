/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { CSSProperties, useEffect, useRef } from 'react';
import ICell from '../../@types/cell';
import './Grid.scss';

function Grid({
  divToDisplay,
  gridStyle,
  aliveCells,
  userAddCellAlive,
}: {
  divToDisplay: JSX.Element[] | undefined;
  gridStyle: CSSProperties | undefined;
  aliveCells: ICell;
  userAddCellAlive: (index: number, rifleMode?: boolean) => void;
}) {
  const oldAlive = useRef<1[]>([]);
  if (divToDisplay) {
    oldAlive.current.forEach((_, index) => {
      divToDisplay[index] = (
        <div
          key={index}
          className="cell"
          role="button"
          onClick={() => {
            userAddCellAlive(index);
          }}
          onMouseOver={() => {
            userAddCellAlive(index, true);
          }}
        />
      );
    });

    if (aliveCells.cells.length > 0) {
      aliveCells.cells.forEach((_, index: number) => {
        if (index < divToDisplay.length) {
          divToDisplay[index] = (
            <div className="cell cell--alive" key={index} role="button" />
          );
        }
      });
    }
    oldAlive.current = aliveCells.cells.slice();
  }

  return (
    <div className="container">
      <div className="grid" style={gridStyle}>
        {divToDisplay}
      </div>
    </div>
  );
}

export default Grid;
