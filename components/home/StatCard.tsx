interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 text-center">
      <p className="text-4xl font-bold text-slate-900 mb-2" aria-label={`${value} ${label}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-sm text-slate-600">{label}</p>
    </article>
  );
}
