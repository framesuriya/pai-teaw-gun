import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'contents');

export type PostStatus = 'review' | 'planning';

export interface TripPlace {
    name: string;
    area?: string;
    priority?: number; // 1-3
    mapUrl?: string;
    note?: string;
}

export interface TripItineraryBlock {
    time?: string; // Morning / Afternoon / Evening / HH:MM
    title?: string;
    text?: string;
}

export interface TripItineraryDay {
    day: number;
    date?: string;
    title?: string;
    blocks?: TripItineraryBlock[];
}

export interface TripBudgetItem {
    category: string;
    planned?: number;
    actual?: number;
}

export interface BlogPost {
    slug: string;
    title: string;
    date?: string;
    description?: string;
    category?: string;
    location?: string;
    country?: string;
    city?: string;
    status: PostStatus;
    startDate?: string;
    endDate?: string;
    content: string;
    filePath: string;
    cover: string;
    // Trip-specific (typically present on status === 'planning' posts)
    participants?: string[];
    budget?: number;
    currency?: string;
    itinerary?: TripItineraryDay[];
    places?: TripPlace[];
    budgetBreakdown?: TripBudgetItem[];
}

/**
 * Get all MDX files recursively from the contents directory.
 * Files or folders whose name starts with `_` are skipped — useful for templates.
 */
export function getAllMdxFiles(dir: string = contentDirectory): string[] {
    const files: string[] = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
        if (item.startsWith('_')) continue;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getAllMdxFiles(fullPath));
        } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Convert file path to slug (e.g., contents/china/shanghai/shanghai.mdx -> china/shanghai)
 */
export function filePathToSlug(filePath: string): string {
    const relativePath = path.relative(contentDirectory, filePath);
    const parsed = path.parse(relativePath);

    const dir = parsed.dir;
    const name = parsed.name;

    if (dir && dir.endsWith(name)) {
        return dir;
    }

    return dir ? `${dir}/${name}` : name;
}

function normalizeStatus(raw: unknown): PostStatus {
    return raw === 'planning' ? 'planning' : 'review';
}

/**
 * Get all blog posts with metadata
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    const files = getAllMdxFiles();

    const posts = files.map((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const slug = filePathToSlug(filePath);

        return {
            slug,
            title: data.title || slug.split('/').pop() || 'Untitled',
            date: data.date,
            description: data.description,
            category: data.category,
            location: data.location,
            country: data.country,
            city: data.city,
            status: normalizeStatus(data.status),
            startDate: data.startDate,
            endDate: data.endDate,
            content,
            filePath,
            cover: data.cover,
            participants: Array.isArray(data.participants) ? data.participants : undefined,
            budget: typeof data.budget === 'number' ? data.budget : undefined,
            currency: data.currency,
            itinerary: Array.isArray(data.itinerary) ? data.itinerary : undefined,
            places: Array.isArray(data.places) ? data.places : undefined,
            budgetBreakdown: Array.isArray(data.budgetBreakdown) ? data.budgetBreakdown : undefined,
        };
    });

    // Sort by date if available, newest first
    return posts.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const allPosts = await getAllPosts();
    return allPosts.find((post) => post.slug === slug) || null;
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
    const posts = await getAllPosts();
    const categories = new Set<string>();

    posts.forEach((post) => {
        if (post.category) {
            categories.add(post.category);
        }
    });

    return Array.from(categories);
}

/**
 * Filter posts by status (review = blog, planning = trips)
 */
export async function getPostsByStatus(status: PostStatus): Promise<BlogPost[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.status === status);
}

/**
 * Format a start/end date pair as a short human-readable range.
 * Returns null if neither date is provided.
 */
export function formatDateRange(start?: string, end?: string): string | null {
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
        if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
            return start && end ? `${start} – ${end}` : start || end || null;
        }
        if (s.getFullYear() === e.getFullYear()) {
            return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
        }
        return `${s.toLocaleDateString('en-US', yearOpts)} – ${e.toLocaleDateString('en-US', yearOpts)}`;
    }
    const only = new Date(start || end!);
    if (Number.isNaN(only.getTime())) return start || end || null;
    return only.toLocaleDateString('en-US', yearOpts);
}

/**
 * Format a YYYY-MM-DD as "Jan 10, 2027" or returns the input if invalid.
 */
export function formatDateLong(value?: string): string | null {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format a number with thousands separators, suffixed with currency code.
 */
export function formatMoney(amount: number | undefined, currency?: string): string | null {
    if (typeof amount !== 'number' || Number.isNaN(amount)) return null;
    const formatted = amount.toLocaleString('en-US');
    return currency ? `${formatted} ${currency}` : formatted;
}