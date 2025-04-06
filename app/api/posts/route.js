/* import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'public', 'publicPosts');
    const files = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return { fileName: file, content };
      })
    );

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error reading posts:", error);
    return new Response("Failed to load posts", { status: 500 });
  }
} */
