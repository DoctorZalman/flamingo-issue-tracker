interface BadgeProps {
  label: string;
  color?: string;
}

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
      style={{ backgroundColor: color ?? "#6366f1" }}
    >
      {label}
    </span>
  );
}
