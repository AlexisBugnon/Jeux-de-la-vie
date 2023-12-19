/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import { useEffect, useRef } from 'react';
import IGrid from '../../@types/grid';
import ICell from '../../@types/cell';

/* eslint-disable jsx-a11y/control-has-associated-label */
function DefaultCell({
  index,
  aliveCells,
  setAliveCells,
}: {
  index: number;
  aliveCells: ICell;
  setAliveCells: React.Dispatch<React.SetStateAction<ICell>>;
}) {
  const mouseDown = useRef(false);

  useEffect(() => {
    const handleDown = () => {
      mouseDown.current = true;
    };
    const handleUp = () => {
      mouseDown.current = false;
    };
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  const userAddCellAlive = (rifleMode = false) => {
    if (!rifleMode || (rifleMode && mouseDown.current)) {
      const newAliveCells = { ...aliveCells };
      newAliveCells.cells[index] = 1;
      setAliveCells(newAliveCells);
    }
  };

  return (
    <div
      key={index}
      className="cell"
      role="button"
      onClick={() => {
        userAddCellAlive();
      }}
      onMouseOver={() => {
        userAddCellAlive(true);
      }}
    />
  );
}

export default DefaultCell;
