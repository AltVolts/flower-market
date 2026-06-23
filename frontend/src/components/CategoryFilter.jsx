export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="bg-surface rounded-2xl shadow-soft p-6">
      <h3 className="font-heading font-semibold text-lg mb-6 text-warm">Категории</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
            selected === null
              ? 'bg-primary text-warm font-medium shadow-soft'
              : 'hover:bg-cream/50 text-warm-light'
          }`}
        >
          Все товары
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
              selected === category.id
                ? 'bg-primary text-warm font-medium shadow-soft'
                : 'hover:bg-cream/50 text-warm-light'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
