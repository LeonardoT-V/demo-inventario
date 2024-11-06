export default function GridContainer({ children, ...props }) {
  return (
    <section className="mb-2.5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      {children}
    </section>
  );
}
