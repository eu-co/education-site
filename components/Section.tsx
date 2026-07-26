export default function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-10 font-display">{title}</h2>
        {children}
      </div>
    </div>
  );
}
