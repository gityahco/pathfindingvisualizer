import { useMemo, useState, useCallback } from "react";
import Grid from "./Grid";
import Menu from "./Menu";

const COLUMNS = 50;
const ROWS = 20;
function Index() {
  // const [isRunning, setIsRunning] = useState(true);

  const [cellType, setCellType] = useState({
    start: null,
    end: null,
    wall: [],
    path: [],
    explored: [],
    uncovered: [],
  });

  const getNeighbors = useCallback(
    (row, col) => {
      const neighbors = [];

      const checkNeighbor = (row, col) => {
        if (
          row >= 0 &&
          row < ROWS &&
          col >= 0 &&
          col < COLUMNS &&
          !cellType.wall.includes(`${row}-${col}`)
        ) {
          neighbors.push([row, col]);
        }
      };

      checkNeighbor(row - 1, col); // Top neighbor
      checkNeighbor(row, col + 1); // Right neighbor
      checkNeighbor(row + 1, col); // Bottom neighbor
      checkNeighbor(row, col - 1); // Left neighbor

      return neighbors;
    },
    [cellType.wall]
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dijkstra = useCallback(async () => {
    const distances = Array.from({ length: ROWS }, () =>
      Array(COLUMNS).fill(Infinity)
    );

    const [startRow, startCol] = cellType.start.split("-").map(Number);

    distances[startRow][startCol] = 0;

    const queue = [[startRow, startCol, 0]];

    setCellType((prev) => ({
      ...prev,
      explored: [],
      path: [],
      uncovered: [],
    }));

    while (queue.length > 0) {
      await delay(10);
      const [currentRow, currentCol, distance] = queue.shift();
      setCellType((prev) => ({
        ...prev,
        explored: prev.explored.concat(`${currentRow}-${currentCol}`),
      }));

      const neighbors = getNeighbors(currentRow, currentCol);
      for (const [neighborRow, neighborCol] of neighbors) {
        if (!cellType.explored.includes(`${currentRow}-${currentCol}`)) {
          setCellType((prev) => ({
            ...prev,
            uncovered: prev.uncovered.concat(`${neighborRow}-${neighborCol}`),
          }));
        }
        const newDistance = distance + 1;

        if (cellType.end === `${currentRow}-${currentCol}`) {
          const path = [];
          let row = currentRow;
          let col = currentCol;

          while (!(row === startRow && col === startCol)) {
            path.unshift(`${row}-${col}`);
            const neighbors = getNeighbors(row, col);
            let minDistance = Infinity;
            let nextRow = row;
            let nextCol = col;
            for (const [neighborRow, neighborCol] of neighbors) {
              const distance = distances[neighborRow][neighborCol];
              if (distance < minDistance) {
                minDistance = distance;
                nextRow = neighborRow;
                nextCol = neighborCol;
              }
            }
            row = nextRow;
            col = nextCol;
          }
          while (path.length > 0) {
            const pathed = path.shift();
            setCellType((prev) => ({
              ...prev,
              path: prev.path.concat(`${pathed}`),
            }));
            await delay(10);
          }
          return;
        }

        if (newDistance < distances[neighborRow][neighborCol]) {
          distances[neighborRow][neighborCol] = newDistance;
          queue.push([neighborRow, neighborCol, newDistance]);
        }
      }
    }
  }, [cellType.end, cellType.explored, cellType.start, getNeighbors]);

  const [selectedCellType, setSelectedCellType] = useState(null);

  const handleCellTypeChange = useCallback((option) => {
    setSelectedCellType(option);
  }, []);

  const generateCellClassName = useMemo(() => {
    const memoizedClassName = {};
    return function (row, col) {
      const position = `${row}-${col}`;
      if (!memoizedClassName[position]) {
        memoizedClassName[position] = position;
      }
      return memoizedClassName[position];
    };
  }, []);
  const clearTheBoard = () => {
    setCellType((prev) => ({
      ...prev,
      start: null,
      end: null,
      wall: [],
      explored: [],
      path: [],
      uncovered: [],
    }));
  };
  const generateRandomMaze = useCallback(async () => {
    // Create a grid with all walls
    const maze = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(true));

    // Helper function to carve paths in the maze
    function carvePath(row, col) {
      maze[row][col] = false; // Remove the wall at the current position

      // Define the possible directions to move
      const directions = [
        { row: -2, col: 0 }, // Up
        { row: 2, col: 0 }, // Down
        { row: 0, col: -2 }, // Left
        { row: 0, col: 2 }, // Right
      ];

      // Randomize the order of directions
      directions.sort(() => Math.random() - 0.5);

      // Iterate through each direction
      for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        // Check if the new position is within the maze boundaries
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLUMNS &&
          maze[newRow][newCol]
        ) {
          // Carve a path by removing the wall between the current and new positions
          maze[row + direction.row / 2][col + direction.col / 2] = false;
          carvePath(newRow, newCol);
        }
      }
    }

    // Start carving paths from a random position
    const startRow = Math.floor(Math.random() * ROWS);
    const startCol = Math.floor(Math.random() * COLUMNS);
    carvePath(startRow, startCol);

    // Update the cellType state to reflect the generated maze
    setCellType((prev) => ({
      ...prev,
      wall: maze
        .map((row, rowIndex) =>
          row.map((isWall, colIndex) =>
            isWall ? `${rowIndex}-${colIndex}` : null
          )
        )
        .flat()
        .filter(Boolean),
    }));
  }, []);

  return (
    <div className="Index">
      <Menu
        handleCellTypeChange={handleCellTypeChange}
        dijkstra={dijkstra}
        cellType={cellType}
        generateRandomMaze={generateRandomMaze}
        clearTheBoard={clearTheBoard}
      />
      {/* <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button> */}
      <Grid
        selectedCellType={selectedCellType}
        ROWS={ROWS}
        COLUMNS={COLUMNS}
        cellType={cellType}
        setCellType={setCellType}
        generateCellClassName={generateCellClassName}
        getNeighbors={getNeighbors}
        dijkstra={dijkstra}
      />
    </div>
  );
}

export default Index;
