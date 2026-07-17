import Link from "next/link";

const articles = [
  {
    id: 1,
    tag: "НОВЕ",
    title: "Електризуючий новий BMW iX",
    category: "Огляд",
  },
  {
    id: 2,
    tag: null,
    title: "Тест-драйв: KIA EV6 GT",
    category: "Тест-драйв",
  },
  {
    id: 3,
    tag: null,
    title: "Огляд спорткарів: Найкращі EV 2025",
    category: "Огляд",
  },
  {
    id: 4,
    tag: "ГОРЯЧЕ",
    title: "Розвиток інфраструктури EV зарядок",
    category: "Новини",
  },
];

export default function EvClubSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-dark">
            Дослідити EV Клуб
          </h2>
          <Link
            href="/ev-club"
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Переглянути все →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/ev-club/${article.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-200 hover:shadow-card-hover"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="flex h-full items-center justify-center">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              </div>

              {/* Tag */}
              {article.tag && (
                <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-white">
                  {article.tag}
                </span>
              )}

              {/* Content */}
              <div className="p-4">
                <span className="text-xs font-medium text-primary">
                  {article.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-dark line-clamp-2 transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
