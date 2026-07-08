import { getPostsByStatus } from '@/lib/mdx';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import Image from 'next/image';

export const metadata = {
    title: 'Travel Blog — Pai Teaw Gun',
    description:
        'Reviews, photo stories, and food journals from adventures around the world.',
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

export default async function BlogIndexPage() {
    const posts = await getPostsByStatus('review');

    return (
        <SiteShell active="blog">
            <section className="relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
                />
                <div
                    aria-hidden="true"
                    className="absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-400/30 dark:bg-purple-500/20 blur-3xl"
                />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/10 text-gray-700 dark:text-gray-200 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur">
                        ✍️ Travel reviews & stories
                    </span>
                    <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        The Blog
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Honest reviews, photo journals, and food stories from places I&apos;ve
                        actually been. New posts after every trip.
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {posts.length === 0 ? (
                    <div className="rounded-3xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-900 p-12 text-center">
                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            No reviews yet
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Once a trip wraps up, the review lands here. Check back soon!
                        </p>
                        <Link
                            href="/trips"
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition"
                        >
                            See upcoming trips
                            <ArrowIcon />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => {
                            const range = formatDateRange(post.startDate, post.endDate);
                            const fallbackDate = post.date
                                ? new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })
                                : null;
                            return (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug.split('/').map(encodeURIComponent).join('/')}`}
                                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="h-32 bg-linear-to-br from-blue-500/90 via-purple-500/90 to-pink-500/90 relative"
                                    >
                                        {post.cover ?
                                            <Image
                                                src={post.cover}
                                                alt={`Cover image for ${post.title}`}
                                                width={800}
                                                height={400}
                                                quality={80}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            /> :
                                            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_50%)]" />}
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                                            {post.category && (
                                                <span className="text-purple-600 dark:text-purple-400">
                                                    {post.category}
                                                </span>
                                            )}
                                            {post.location && (
                                                <>
                                                    <span className="text-gray-300 dark:text-gray-600">
                                                        •
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 normal-case tracking-normal">
                                                        <PinIcon />
                                                        {post.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                            {post.title}
                                        </h2>

                                        {post.description && (
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
                                                {post.description}
                                            </p>
                                        )}
                                        {!post.description && <div className="flex-1" />}

                                        <div className="mt-5 min-h-12 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                                            {range ? (
                                                <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                    <CalendarIcon />
                                                    {range}
                                                </span>
                                            ) : fallbackDate ? (
                                                <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                    <CalendarIcon />
                                                    {fallbackDate}
                                                </span>
                                            ) : (
                                                <span />
                                            )}
                                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                Read
                                                <ArrowIcon />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </SiteShell>
    );
}