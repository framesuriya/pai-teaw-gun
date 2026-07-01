import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Headings
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                {children}
            </h4>
        ),

        // Paragraphs and text
        p: ({ children }) => (
            <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                {children}
            </p>
        ),

        // Lists
        ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li className="ml-4 text-lg">{children}</li>
        ),

        // Links
        a: ({ href, children }) => (
            <Link
                href={href || '#'}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
                {children}
            </Link>
        ),

        // Code blocks
        pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto">
                {children}
            </pre>
        ),
        code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
                {children}
            </code>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
                {children}
            </blockquote>
        ),

        // Horizontal rule
        hr: () => (
            <hr className="my-8 border-gray-300 dark:border-gray-700" />
        ),

        // Tables
        table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }) => (
            <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                {children}
            </td>
        ),

        // Images
        img: ({ src, alt }) => (
            <div className="my-6">
                <Image
                    src={src || ''}
                    alt={alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            </div>
        ),

        ...components,
    };
}
