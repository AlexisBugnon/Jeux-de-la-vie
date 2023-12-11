import ICell from './cell';

interface IGrid {
  numberLine: number;
  numberColumn: number;
  sizeCells: number;
  cells: ICell[];
  cellsAlive: ICell[];
}

export default IGrid;
