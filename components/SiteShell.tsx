import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

type SiteShellProps = {
    active?: 'home' | 'blog' | 'trips';
    children: ReactNode;
};

export function SiteShell({ active = 'home', children }: SiteShellProps) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <SiteHeader active={active} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}