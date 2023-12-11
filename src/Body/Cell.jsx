import { useCallback } from "react";
import PropTypes from "prop-types";

export default function Cell({
  cellPosition,
  row,
  col,
  cellType,
  setCellType,
  selectedCellType,
  generateCellClassName,
}) {
  const handleCellClick = useCallback(
    (row, col) => {
      const cellPosition = generateCellClassName(row, col);
      const updatePositions = (prevPositions) => ({
        ...prevPositions,
        start:
          prevPositions.start === cellPosition ? null : prevPositions.start,
        end: prevPositions.end === cellPosition ? null : prevPositions.end,
        wall: prevPositions.wall.filter(
          (position) => position !== cellPosition
        ),
      });
      switch (selectedCellType) {
        case "start":
          setCellType((prevPositions) => ({
            ...updatePositions(prevPositions),
            start: cellPosition,
          }));
          break;
        case "end":
          setCellType((prevPositions) => ({
            ...updatePositions(prevPositions),
            end: cellPosition,
          }));
          break;
        case "wall":
          setCellType((prevPositions) => ({
            ...updatePositions(prevPositions),
            wall: prevPositions.wall.includes(cellPosition)
              ? prevPositions.wall.filter((position) => position !== cellPosition)
              : [...prevPositions.wall, cellPosition],
          }));
          break;
        case "empty":
          setCellType((prevPositions) => updatePositions(prevPositions));
          break;
        default:
          if (!cellType.start) {
            setCellType((prevPositions) => ({
              ...updatePositions(prevPositions),
              start: cellPosition,
            }));
          // setIsAnimating(true)

          } else if (!cellType.end) {
            setCellType((prevPositions) => ({
              ...updatePositions(prevPositions),
              end: cellPosition,
            }));
          } else {
            setCellType((prevPositions) => ({
              ...updatePositions(prevPositions),
              wall: prevPositions.wall.includes(cellPosition)
                ? prevPositions.wall.filter((position) => position !== cellPosition)
                : [...prevPositions.wall, cellPosition],
            }));
          }
          break;
      }

    },
    [
      cellType.end,
      cellType.start,
      generateCellClassName,
      selectedCellType,
      setCellType,
    ]
  );
  const isStart = cellPosition === cellType.start;
  const isEnd = cellPosition === cellType.end;
  const isWall = cellType.wall.includes(cellPosition);
  const isPath = cellType.path.includes(cellPosition);
  const isExplored = cellType.explored.includes(cellPosition);
  const isAhead = cellType.uncovered.includes(cellPosition);

  return (
    <div
      key={cellPosition}
      className={cellPosition}
      id={isStart ? 'start-cell' : isEnd ? 'end-cell' : isWall ? 'wall-cell' : isPath ? 'path-cell' : isExplored ? 'explored-cell' : isAhead ? 'ahead-cell' : 'board-cell'}
      onClick={() => handleCellClick(row, col)}
    >
      {isStart && (
        <svg
          viewBox="-2.4 -2.4 28.80 28.80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
          style={{ display: "block" }}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0">
            <rect
              x="-2.4"
              y="-2.4"
              width="28.80"
              height="28.80"
              rx="0"
              // fill="#7ed0ec"
              fill="red"
              strokeWidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M6 12H18M18 12L13 7M18 12L13 17"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      )}
    </div>
  );
}
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  selectedCellType: PropTypes.string,
  generateCellClassName: PropTypes.func.isRequired,
  cellPosition: PropTypes.string.isRequired,
  cellType: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    wall: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.arrayOf(PropTypes.string),
    explored: PropTypes.arrayOf(PropTypes.string),
    uncovered: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setCellType: PropTypes.func.isRequired,
};
