import PropTypes from "prop-types";

const menuOptions = [
  { label: "Start", value: "start" },
  { label: "End", value: "end" },
  { label: "Wall", value: "wall" },
  { label: "Empty", value: "empty" },
  // { label: "Bomb", value: "bomb" },
  // { label: "Checkpoint", value: "checkpoint" },
];

export default function Menu({
  handleCellTypeChange,
  dijkstra,
  cellType,
  generateRandomMaze,
  clearTheBoard
}) {
  const handleButtonClick = (option) => {
    handleCellTypeChange(option);
  };

  return (
    <div>
      {menuOptions.map((option) => (
        <button
          key={option.value}
          className={`menu-button-${option.value}`}
          onClick={() => handleButtonClick(option.value)}
        >
          {option.label}
        </button>
      ))}
      <button onClick={generateRandomMaze} className="gen-maze">
        Generate Maze
      </button>
      <button onClick={clearTheBoard} className="clear-the-board">
        Clear The Board
      </button>
      <button
        onClick={() => {
          if (!cellType.start) {
            alert("Please set a start point");
          } else if (!cellType.end) {
            alert("Please set an end point");
          } else {
            dijkstra();
          }
        }}
        className="start-algo"
      >
        Start Visualizing
      </button>
    </div>
  );
}

Menu.propTypes = {
  handleCellTypeChange: PropTypes.func.isRequired,
  generateRandomMaze: PropTypes.func.isRequired,
  clearTheBoard: PropTypes.func.isRequired,
  dijkstra: PropTypes.func,
  cellType: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
};
