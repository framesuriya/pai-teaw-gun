import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
            />
            <div
                aria-hidden="true"
                className="absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-purple-400/30 dark:bg-purple-500/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full bg-blue-400/30 dark:bg-blue-500/20 blur-3xl"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/10 text-gray-700 dark:text-gray-200 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    New stories every week
                </span>

                <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                    <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ไปเที่ยวกัน
                    </span>
                </h1>
                <p className="mt-4 text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100">
                    Pai Teaw Gun
                </p>
                <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Adventures, food hunts, and photo stories from around the world.
                    Hidden gems, local cuisines, and unforgettable experiences — all in
                    one place.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Read reviews
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                    <Link
                        href="/trips"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-gray-900 dark:text-gray-100 bg-white/80 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 hover:bg-white dark:hover:bg-white/10 backdrop-blur transition"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Plan a trip
                    </Link>
                </div>

                <dl className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
                    {[
                        { k: 'Countries', v: '2+' },
                        { k: 'Stories', v: 'Live' },
                        { k: 'Cuisines', v: '∞' },
                    ].map((s) => (
                        <div
                            key={s.k}
                            className="rounded-2xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur px-4 py-4"
                        >
                            <dt className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {s.k}
                            </dt>
                            <dd className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {s.v}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

function Pillars() {
    const items = [
        {
            emoji: '✈️',
            title: 'Travel Guides',
            desc: 'Detailed guides, transport tips, and routes for destinations around the globe.',
        },
        {
            emoji: '🍜',
            title: 'Local Cuisine',
            desc: 'Hand-picked food spots, street eats, and the dishes you cannot miss.',
        },
        {
            emoji: '📸',
            title: 'Photo Stories',
            desc: 'Visual journeys through cities, temples, mountains, and coastal roads.',
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((it) => (
                    <article
                        key={it.title}
                        className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-7 transition hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40"
                        />
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:from-purple-900/40 text-2xl">
                            {it.emoji}
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-gray-100">
                            {it.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {it.desc}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function HomePage() {
    return (
        <SiteShell active="home">
            <Hero />
            <Pillars />
        </SiteShell>
    );
}

export default HomePage;
