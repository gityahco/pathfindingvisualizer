import { useCallback } from "react";
import Cell from "./Cell";
import PropTypes from "prop-types";

export default function Grid({
  selectedCellType,
  ROWS,
  COLUMNS,
  cellType,
  setCellType,
  generateCellClassName,
}) {
  const renderGrid = useCallback(() => {
    const grid = Array.from({ length: ROWS * COLUMNS }, (_, index) => {
      const row = Math.floor(index / COLUMNS);
      const col = index % COLUMNS;
      const cellPosition = generateCellClassName(row, col);
      return (
        <Cell
          row={row}
          col={col}
          cellPosition={cellPosition}
          key={cellPosition}
          className={cellPosition}
          cellType={cellType}
          setCellType={setCellType}
          selectedCellType={selectedCellType}
          generateCellClassName={generateCellClassName}
        />
      );
    });
    return grid;
  }, [
    ROWS,
    COLUMNS,
    generateCellClassName,
    cellType,
    setCellType,
    selectedCellType,
  ]);

  return (
    <div className="Grid">
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
}
Grid.propTypes = {
  selectedCellType: PropTypes.string,
  ROWS: PropTypes.number.isRequired,
  COLUMNS: PropTypes.number.isRequired,
  cellType: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    wall: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.arrayOf(PropTypes.string),
    explored: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setCellType: PropTypes.func.isRequired,
  generateCellClassName: PropTypes.func.isRequired,
};
