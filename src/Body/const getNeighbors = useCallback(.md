  const getNeighbors = useCallback(
    (row, col) => {
      const neighbors = [];

      // Check the top neighbor
      if (row > 0 && !cellType.wall.includes(`${row - 1}-${col}`)) {
        neighbors.push([row - 1, col]);
      }

      // Check the right neighbor
      if (col < COLUMNS - 1 && !cellType.wall.includes(`${row}-${col + 1}`)) {
        neighbors.push([row, col + 1]);
      }

      // Check the bottom neighbor
      if (row < ROWS - 1 && !cellType.wall.includes(`${row + 1}-${col}`)) {
        neighbors.push([row + 1, col]);
      }

      // Check the left neighbor
      if (col > 0 && !cellType.wall.includes(`${row}-${col - 1}`)) {
        neighbors.push([row, col - 1]);
      }

      return neighbors;
    },
    [cellType.wall]
  );