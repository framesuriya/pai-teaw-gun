import Link from 'next/link';
import { LogoMark } from './LogoMark';

type NavItem = {
    href: string;
    label: string;
};

const NAV_ITEMS: NavItem[] = [
    { href: '/blog', label: 'Blog' },
    { href: '/trips', label: 'Trips' },
];

type SiteHeaderProps = {
    /** Path of the current page — used to highlight the active nav item. */
    active?: 'home' | 'blog' | 'trips';
};

export function SiteHeader({ active = 'home' }: SiteHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    aria-label="Pai Teaw Gun — back to home"
                    className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100 hover:opacity-80 transition"
                >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 shadow-md">
                        <LogoMark className="h-7 w-7" />
                    </span>
                    <span>Pai Teaw Gun</span>
                </Link>

                <ul className="hidden sm:flex items-center gap-1 text-sm font-medium">
                    {NAV_ITEMS.map((item) => {
                        const isActive = active === item.href.slice(1);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={[
                                        'px-3 py-2 rounded-lg transition',
                                        isActive
                                            ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5',
                                    ].join(' ')}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Link
                    href="/blog"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition"
                >
                    Read stories
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

                <details className="sm:hidden relative">
                    <summary
                        className="list-none cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                        aria-label="Open menu"
                    >
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </summary>
                    <ul className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 shadow-lg p-2 text-sm">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </details>
            </nav>
        </header>
    );
}