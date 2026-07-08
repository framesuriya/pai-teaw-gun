import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
    getAllPosts,
    getPostBySlug,
    formatDateRange,
    formatDateLong,
    formatMoney,
    type TripPlace,
    type TripItineraryDay,
    type TripBudgetItem,
} from '@/lib/mdx';
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
    return {
        title: `${post.title} — Trip Plan`,
        description: post.description,
    };
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

function BackArrowIcon() {
    return (
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
    );
}

function ForwardArrowIcon() {
    return (
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
    );
}

function UsersIcon() {
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function WalletIcon() {
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
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
        </svg>
    );
}

function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            className={
                filled
                    ? 'h-3.5 w-3.5 text-amber-500'
                    : 'h-3.5 w-3.5 text-gray-300 dark:text-gray-600'
            }
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

function PriorityStars({ priority }: { priority?: number }) {
    if (typeof priority !== 'number') return null;
    const p = Math.max(0, Math.min(3, Math.round(priority)));
    return (
        <span
          className="inline-flex items-center gap-0.5"
          aria-label={`Priority ${p} of 3`}
        >
            {[1, 2, 3].map((i) => (
                <StarIcon key={i} filled={i <= p} />
            ))}
        </span>
    );
}

function PlaceCard({ place }: { place: TripPlace }) {
    return (
        <li className="group relative h-full">
            {place.mapUrl ? (
                <Link
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col rounded-2xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                    <PlaceCardBody place={place} />
                </Link>
            ) : (
                <div className="flex h-full flex-col rounded-2xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
                    <PlaceCardBody place={place} />
                </div>
            )}
        </li>
    );
}

function PlaceCardBody({ place }: { place: TripPlace }) {
    return (
        <>
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {place.name}
                </h3>
                <PriorityStars priority={place.priority} />
            </div>
            {place.area && (
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <PinIcon />
                    {place.area}
                </p>
            )}
            {place.note && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {place.note}
                </p>
            )}
        </>
    );
}

function ItinerarySection({ days }: { days: TripItineraryDay[] }) {
    return (
        <section
            aria-labelledby="itinerary-heading"
            className="rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-10 shadow-sm"
        >
            <header className="mb-6 flex items-center justify-between gap-3">
                <h2
                    id="itinerary-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
                >
                    Day-by-day
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {days.length} {days.length === 1 ? 'day' : 'days'}
                </span>
            </header>
            <ol className="relative space-y-6 border-l-2 border-purple-200 dark:border-purple-900/50 pl-6 sm:pl-8">
                {days.map((d) => {
                    const dateLabel = formatDateLong(d.date);
                    return (
                        <li key={d.day} className="relative">
                            <span
                                aria-hidden="true"
                                className="absolute -left-[33px] sm:-left-[41px] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-bold ring-4 ring-white dark:ring-gray-900"
                            >
                                {d.day}
                            </span>
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Day {d.day}
                                </h3>
                                {dateLabel && (
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <CalendarIcon />
                                        {dateLabel}
                                    </span>
                                )}
                                {d.title && (
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        · {d.title}
                                    </span>
                                )}
                            </div>
                            {d.blocks && d.blocks.length > 0 && (
                                <ul className="mt-3 space-y-2">
                                    {d.blocks.map((b, i) => (
                                        <li
                                            key={i}
                                            className="rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3"
                                        >
                                            <div className="flex flex-wrap items-baseline gap-x-2">
                                                {b.time && (
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                                                        {b.time}
                                                    </span>
                                                )}
                                                {b.title && (
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                        {b.title}
                                                    </span>
                                                )}
                                            </div>
                                            {b.text && (
                                                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                                    {b.text}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

function PlacesSection({ places }: { places: TripPlace[] }) {
    return (
        <section
            aria-labelledby="places-heading"
            className="rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-10 shadow-sm"
        >
            <header className="mb-6 flex items-center justify-between gap-3">
                <h2
                    id="places-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
                >
                    Places
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {places.length} {places.length === 1 ? 'spot' : 'spots'}
                </span>
            </header>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((p, i) => (
                    <PlaceCard key={`${p.name}-${i}`} place={p} />
                ))}
            </ul>
        </section>
    );
}

function BudgetSection({
    items,
    total,
    currency,
}: {
    items: TripBudgetItem[];
    total?: number;
    currency?: string;
}) {
    const plannedSum = items.reduce(
        (sum, it) => sum + (typeof it.planned === 'number' ? it.planned : 0),
        0,
    );
    const actualSum = items.reduce(
        (sum, it) => sum + (typeof it.actual === 'number' ? it.actual : 0),
        0,
    );
    const showActual = items.some((it) => typeof it.actual === 'number');
    const effectiveTotal = typeof total === 'number' ? total : plannedSum;
    return (
        <section
            aria-labelledby="budget-heading"
            className="rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-10 shadow-sm"
        >
            <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2
                    id="budget-heading"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
                >
                    Budget
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {typeof total === 'number' ? (
                        <span>
                            Total target:{' '}
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {formatMoney(total, currency) ?? `${total}`}
                            </span>
                        </span>
                    ) : null}
                </div>
            </header>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b border-black/5 dark:border-white/10">
                            <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                Category
                            </th>
                            <th className="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">
                                Planned
                            </th>
                            {showActual && (
                                <th className="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">
                                    Actual
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((it, i) => (
                            <tr
                                key={`${it.category}-${i}`}
                                className="border-b border-black/5 dark:border-white/5"
                            >
                                <td className="px-3 py-3 text-gray-800 dark:text-gray-200">
                                    {it.category}
                                </td>
                                <td className="px-3 py-3 text-right tabular-nums text-gray-800 dark:text-gray-200">
                                    {formatMoney(it.planned, currency) ?? '—'}
                                </td>
                                {showActual && (
                                    <td className="px-3 py-3 text-right tabular-nums text-gray-800 dark:text-gray-200">
                                        {formatMoney(it.actual, currency) ?? '—'}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t-2 border-black/10 dark:border-white/15">
                            <td className="px-3 py-3 font-semibold text-gray-900 dark:text-gray-100">
                                Subtotal
                            </td>
                            <td className="px-3 py-3 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">
                                {formatMoney(plannedSum, currency) ?? '—'}
                            </td>
                            {showActual && (
                                <td className="px-3 py-3 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">
                                    {formatMoney(actualSum, currency) ?? '—'}
                                </td>
                            )}
                        </tr>
                        {typeof total === 'number' && total !== plannedSum && (
                            <tr>
                                <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                                    Headline target
                                </td>
                                <td className="px-3 py-2 text-right tabular-nums text-xs text-gray-500 dark:text-gray-400">
                                    {formatMoney(effectiveTotal, currency) ?? `${total}`}
                                </td>
                                {showActual && <td />}
                            </tr>
                        )}
                    </tfoot>
                </table>
            </div>
        </section>
    );
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
    const range = isPlanning
        ? formatDateRange(post.startDate, post.endDate)
        : formatDateRange(post.date, undefined);

    const hasItinerary =
        Array.isArray(post.itinerary) && post.itinerary.length > 0;
    const hasPlaces = Array.isArray(post.places) && post.places.length > 0;
    const hasBudget =
        Array.isArray(post.budgetBreakdown) && post.budgetBreakdown.length > 0;
    const hasBudgetTotal = typeof post.budget === 'number';
    const hasParticipants =
        Array.isArray(post.participants) && post.participants.length > 0;

    return (
        <SiteShell active="trips">
            <article className="relative">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
                    <Link
                        href="/trips"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                    >
                        <BackArrowIcon />
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
                            {post.country && (
                                <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 normal-case tracking-normal">
                                    <PinIcon />
                                    {post.country}
                                    {post.city ? ` · ${post.city}` : null}
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

                        {(hasParticipants ||
                            (typeof post.budget === 'number' && post.budget > 0)) && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                {hasParticipants && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 px-4 py-2 text-sm">
                                        <UsersIcon />
                                        <span className="text-gray-700 dark:text-gray-200">
                                            {post.participants!.join(' · ')}
                                        </span>
                                    </div>
                                )}
                                {typeof post.budget === 'number' && post.budget > 0 && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 px-4 py-2 text-sm">
                                        <WalletIcon />
                                        <span className="text-gray-700 dark:text-gray-200">
                                            ~{formatMoney(post.budget, post.currency) ?? post.budget}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </header>

                    <div className="mt-10 space-y-6">
                        {hasItinerary && (
                            <ItinerarySection days={post.itinerary!} />
                        )}
                        {hasPlaces && <PlacesSection places={post.places!} />}
                        {hasBudget && (
                            <BudgetSection
                                items={post.budgetBreakdown!}
                                total={hasBudgetTotal ? post.budget : undefined}
                                currency={post.currency}
                            />
                        )}

                        {post.content.trim().length > 0 && (
                            <section
                                aria-labelledby="notes-heading"
                                className="rounded-3xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-10 shadow-sm"
                            >
                                <h2
                                    id="notes-heading"
                                    className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6"
                                >
                                    Notes
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-purple-600 dark:prose-a:text-purple-400">
                                    <MDXRemote
                                        source={post.content}
                                        components={mdxComponents}
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <Link
                            href="/trips"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            <BackArrowIcon />
                            All trip plans
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            Read reviews
                            <ForwardArrowIcon />
                        </Link>
                    </div>
                </div>
            </article>
        </SiteShell>
    );
}
