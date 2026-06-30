interface StatCardProps {
  label: string;
  value: number;
  accentClass: string;
}

const StatCard = ({ label, value, accentClass }: StatCardProps) => {
  return (
    <div className={`stat-card ${accentClass}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

export default StatCard;