export default function PageContainer({ children }) {
  return (
    <div
      className="mx-auto w-full"
      style={{
        maxWidth: "var(--content-max)",
        paddingInline: "var(--page-padding)",
      }}
    >
      {children}
    </div>
  );
}