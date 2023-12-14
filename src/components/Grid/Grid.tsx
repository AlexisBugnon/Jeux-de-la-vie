/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { CSSProperties, useEffect, useState } from 'react';
import ICell from '../../@types/cell';
import IGrid from '../../@types/grid';
import './Grid.scss';

function Grid({
  divToDisplay,
  gridStyle,
  cellsAlive,
}: {
  divToDisplay: JSX.Element[] | undefined;
  gridStyle: CSSProperties | undefined;
  cellsAlive: ICell[];
}) {
  let divDefault: JSX.Element[] = [];
  if (divToDisplay) {
    divDefault = divToDisplay.slice();
    cellsAlive.forEach((cell: ICell, index: number) => {
      if (index < divDefault.length) {
        divDefault[index] = (
          <div className="cell cell--alive" key={index} role="button" />
        );
      }
    });
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
