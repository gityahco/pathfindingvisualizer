import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const Algorithms = [
    { value: "", label: "Algorithms" },
    { value: "option1", label: "1" },
    { value: "option2", label: "2" },
    { value: "option3", label: "3" },
  ];

  const Patterns = [
    { value: "", label: "Mazes & Patterns" },
    { value: "option1", label: "1" },
    { value: "option2", label: "2" },
    { value: "option3", label: "3" },
  ];

  return (
    <div className="Header">
      <DropdownMenu options={Algorithms} />
      <DropdownMenu options={Patterns} />
    </div>
  );
}
