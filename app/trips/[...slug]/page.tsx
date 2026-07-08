import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { mdxComponents } from '@/components/mdx-components';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug.split('/') }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug: parts } = await params;
    const slug = parts.join('/');
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Trip Not Found' };
    return { title: `${post.title} — Trip Plan`, description: post.description };
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

export default async function TripDetail({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug: parts } = await params;
    const slug = parts.join('/');
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const isPlanning = post.status === 'planning';
    // Planning posts show trip dates (startDate/endDate), review posts show review date
    const range = isPlanning
        ? formatDateRange(post.startDate, post.endDate)
        : formatDateRange(post.date, undefined);

    return (
        <SiteShell active="trips">
            <article className="relative">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
                />

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
                    <Link
                        href="/trips"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to trip plans
                    </Link>

                    <header className="mt-8 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider">
                            <span
                                className={
                                    isPlanning
                                        ? 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 normal-case tracking-normal'
                                        : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 normal-case tracking-normal'
                                }
                            >
                                {isPlanning ? 'Planning' : 'Review'}
                            </span>
                            {post.category && (
                                <span className="text-purple-600 dark:text-purple-400">
                                    {post.category}
                                </span>
                            )}
                            {post.location && (
                                <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 normal-case tracking-normal">
                                    <PinIcon />
                                    {post.location}
                                </span>
                            )}
                            {range && (
                                <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 normal-case tracking-normal">
                                    <CalendarIcon />
                                    {range}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
                            {post.title}
                        </h1>

                        {post.description && (
                            <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                {post.description}
                            </p>
                        )}
                    </header>

                    <div className="mt-12 rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-10 shadow-sm">
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-purple-600 dark:prose-a:text-purple-400">
                            <MDXRemote source={post.content} components={mdxComponents} />
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <Link
                            href="/trips"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            All trip plans
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            Read reviews
                            <svg
                                className="h-4 w-4"
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
                    </div>
                </div>
            </article>
        </SiteShell>
    );
}