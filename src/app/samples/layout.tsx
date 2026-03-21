export default function SamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-fade-canvas text-fade-navy">{children}</div>
  );
}
