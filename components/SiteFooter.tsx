import Link from 'next/link';
import { LogoMark } from './LogoMark';

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t border-black/5 dark:border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                    href="/"
                    aria-label="Pai Teaw Gun — back to home"
                    className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 hover:opacity-80 transition"
                >
                    <LogoMark className="h-7 w-7" />
                    Pai Teaw Gun
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} • Travel. Eat. Repeat.
                </p>
                <nav aria-label="Footer" className="flex items-center gap-4 text-sm">
                    <Link
                        href="/blog"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/trips"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Trips
                    </Link>
                </nav>
            </div>
        </footer>
    );
}