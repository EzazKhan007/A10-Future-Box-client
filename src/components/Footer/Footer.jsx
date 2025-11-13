export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-center p-6 mt-8">
      <div className="container mx-auto">
        <h3 className="text-lg font-semibold">CleanCity</h3>
        <p className="text-sm">A community cleanliness & issue reporting portal.</p>
        <p className="text-xs mt-2">© {new Date().getFullYear()} CleanCity. All rights reserved.</p>
      </div>
    </footer>
  );
}
