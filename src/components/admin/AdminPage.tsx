export default function AdminPage({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7254]">Admin</p>
          <h1 className="mt-4 text-[clamp(32px,4vw,46px)] leading-[1.05] tracking-[-0.03em] text-[#1d1916]">{title}</h1>
          {description ? <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-[#62574c]">{description}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </div>
  );
}
