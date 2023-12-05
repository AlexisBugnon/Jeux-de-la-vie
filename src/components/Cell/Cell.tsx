function Cell(numberOfCells: number) {
  const cells = [];
  for (let index = 0; index < numberOfCells; index += 1) {
    cells.push(<div key={index}>{index}</div>);
  }
  return cells;
}

export default Cell;
