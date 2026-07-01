import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'contents');

export type PostStatus = 'review' | 'planning';

export interface BlogPost {
    slug: string;
    title: string;
    date?: string;
    description?: string;
    category?: string;
    location?: string;
    status: PostStatus;
    startDate?: string;
    endDate?: string;
    content: string;
    filePath: string;
}

/**
 * Get all MDX files recursively from the contents directory
 */
export function getAllMdxFiles(dir: string = contentDirectory): string[] {
    const files: string[] = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
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
            status: normalizeStatus(data.status),
            startDate: data.startDate,
            endDate: data.endDate,
            content,
            filePath,
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