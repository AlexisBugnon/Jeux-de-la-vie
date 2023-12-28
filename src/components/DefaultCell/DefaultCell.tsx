/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

/* eslint-disable jsx-a11y/control-has-associated-label */
function DefaultCell({
  index,
  userAddCellAlive,
}: {
  index: number;
  userAddCellAlive: (index: number, rifleMode?: boolean) => void;
}) {
  return (
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
}

export default DefaultCell;
