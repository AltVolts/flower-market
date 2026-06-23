export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-heading font-semibold text-lg mb-4">Категории</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded transition ${
            selected === null
              ? 'bg-primary text-white'
              : 'hover:bg-cream'
          }`}
        >
          Все товары
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full text-left px-3 py-2 rounded transition ${
              selected === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-cream'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
