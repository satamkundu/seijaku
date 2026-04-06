export default function AdminCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`rounded-[28px] border border-[#d7cec1] bg-[#fbf8f3] p-6 shadow-[0_18px_50px_rgba(55,42,31,0.04)] ${className}`}>{children}</div>;
}
