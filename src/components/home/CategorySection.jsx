

const categories = [
  {
    title: 'Garbage',
    subtitle: 'Overflowing garbage choking our streets. Help keep your neighborhood clean.',
    ctaText: 'Report Now',
    icon: '🗑️'
  },
  {
    title: 'Illegal Construction',
    subtitle: 'Unauthorized structures can block drainage and reduce safety.',
    ctaText: 'File a Complaint',
    icon: '🏗️'
  },
  {
    title: 'Broken Public Property',
    subtitle: 'Damaged benches, lights, or bus stops need fixing for safety.',
    ctaText: 'Request Repair',
    icon: '🔧'
  },
  {
    title: 'Road Damage',
    subtitle: 'Potholes and cracked roads slow traffic and increase accidents.',
    ctaText: 'Report Road Issue',
    icon: '🛣️'
  }
]

export default function CategorySection() {
  return (
    <section className="py-16 px-6 transition-colors">
     
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Report Community Issues
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Identify problems in your neighborhood and help us fix them together. Choose a category below to get started.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-center text-4xl mb-4">
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">
              {cat.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
              {cat.subtitle}
            </p>
            <button className="mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
              {cat.ctaText}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
