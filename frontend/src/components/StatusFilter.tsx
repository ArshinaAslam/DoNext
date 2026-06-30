type FilterValue = "All" | "Pending" | "In-Progress" | "Completed";

interface StatusFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const OPTIONS: FilterValue[] = ["All", "Pending", "In-Progress", "Completed"];

const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <div className="status-filter">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          className={value === opt ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;