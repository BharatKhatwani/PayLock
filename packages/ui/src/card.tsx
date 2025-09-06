export function Card({
  title,
  children,
  className = "",   // ✅ add default
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;   
}): JSX.Element {
  return (
    <div className={`border p-6 bg-white rounded-xl ${className}`}>
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
