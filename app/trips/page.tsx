import { getPostsByStatus } from '@/lib/mdx';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';

export const metadata = {
    title: 'Trip Plans — Pai Teaw Gun',
    description:
        'Upcoming trips in the planning stage — itineraries, budgets, and packing lists.',
};

function CalendarIcon() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg
            className="h-4 w-4"
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
    );
}

function ArrowIcon() {
    return (
        <svg
            className="h-4 w-4 transition group-hover:translate-x-1"
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
    );
}

function ClockIcon() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function formatDateRange(start?: string, end?: string) {
    if (!start && !end) return null;
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const yearOpts: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };
    if (start && end) {
        const s = new Date(start);
        const e = new Date(end);
        if (s.getFullYear() === e.getFullYear()) {
            return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
        }
        return `${s.toLocaleDateString('en-US', yearOpts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
    }
    const only = new Date(start || end!);
    return only.toLocaleDateString('en-US', yearOpts);
}

export default async function TripsIndexPage() {
    const trips = await getPostsByStatus('planning');

    return (
        <SiteShell active="trips">
            <section className="relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
                />
                <div
                    aria-hidden="true"
                    className="absolute -top-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-400/30 dark:bg-blue-500/20 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-pink-400/30 dark:bg-pink-500/20 blur-3xl"
                />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/10 text-gray-700 dark:text-gray-200 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur">
                        <ClockIcon />
                        Planning in progress
                    </span>
                    <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Trip Plans
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Drafts, route ideas, and dates locked in for upcoming trips.
                        Once a trip is done, the review moves to the{' '}
                        <Link
                            href="/blog"
                            className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                        >
                            blog
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {trips.length === 0 ? (
                    <div className="rounded-3xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-900 p-12 text-center">
                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Nothing on the horizon yet
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Add a trip with{' '}
                            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-sm">
                                status: &quot;planning&quot;
                            </code>{' '}
                            in the frontmatter and it&apos;ll show up here.
                        </p>
                        <Link
                            href="/blog"
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition"
                        >
                            Browse past trips
                            <ArrowIcon />
                        </Link>
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {trips.map((trip) => {
                            const range = formatDateRange(trip.startDate, trip.endDate);
                            return (
                                <li key={trip.slug}>
                                    <Link
                                        href={`/trips/${trip.slug}`}
                                        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 transition hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="p-7 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                                                    <ClockIcon />
                                                    Planning
                                                </span>
                                                {range && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <CalendarIcon />
                                                        {range}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                                {trip.title}
                                            </h2>

                                            {trip.location && (
                                                <p className="mt-2 inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                    <PinIcon />
                                                    {trip.location}
                                                </p>
                                            )}

                                            {trip.description && (
                                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                                    {trip.description}
                                                </p>
                                            )}

                                            <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                                                {trip.category && (
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                                                        {trip.category}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-gray-100 ml-auto">
                                                    View plan
                                                    <ArrowIcon />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </SiteShell>
    );
}