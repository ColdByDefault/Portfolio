/**
 * Blog System Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

// Core Blog Types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;

  // Metadata
  isPublished: boolean;
  isFeatured: boolean;
  isDraft: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Stats
  readCount: number;
  readingTime?: number;

  // Dates
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  categoryId?: string;
  category?: BlogCategory;
  credits?: BlogCredit;
  tags?: BlogTagRelation[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  blogs?: Blog[];
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  blogs?: BlogTagRelation[];
}

export interface BlogCredit {
  id: string;
  blogId: string;
  originalAuthor: string;
  originalSource?: string;
  sourceUrl?: string;
  licenseType?: string;
  creditText?: string;
  translatedFrom?: string;
  adaptedFrom?: string;
  createdAt: Date;
  updatedAt: Date;
  blog?: Blog;
}

export interface BlogTagRelation {
  id: string;
  blogId: string;
  tagId: string;
  blog?: Blog;
  tag?: BlogTag;
}

// API Request/Response Types
export interface CreateBlogRequest {
  title: string;
  slug?: string; // Auto-generated if not provided
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId?: string;
  tags?: string[]; // Array of tag IDs
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  publishedAt?: Date;
  credits?: Omit<BlogCredit, "id" | "blogId" | "createdAt" | "updatedAt">;
}

export interface UpdateBlogRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  categoryId?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  isDraft?: boolean;
  publishedAt?: Date;
  credits?: Omit<BlogCredit, "id" | "blogId" | "createdAt" | "updatedAt">;
}

export interface BlogListQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  published?: boolean;
  featured?: boolean;
  sortBy?: "createdAt" | "updatedAt" | "publishedAt" | "readCount" | "title";
  sortOrder?: "asc" | "desc";
}

export interface BlogListResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    categories: BlogCategory[];
    tags: BlogTag[];
  };
}

export interface BlogStatsResponse {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  featuredBlogs: number;
  totalReadCount: number;
  categoriesCount: number;
  tagsCount: number;
  topCategories: Array<{
    category: BlogCategory;
    blogCount: number;
  }>;
  topTags: Array<{
    tag: BlogTag;
    blogCount: number;
  }>;
  popularBlogs: Array<{
    blog: Blog;
    readCount: number;
  }>;
  recentBlogs: Blog[];
}

// SEO and Meta Types
export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData: BlogStructuredData;
}

export interface BlogStructuredData {
  "@context": "https://schema.org";
  "@type": "BlogPosting" | "Article";
  headline: string;
  description: string;
  image?: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: string;
  };
  datePublished: string;
  dateModified: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
}

// Utility Types
export type BlogStatus = "draft" | "published" | "featured";
export type BlogSortField =
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "readCount"
  | "title";
export type BlogSortOrder = "asc" | "desc";

// Error Types
export interface BlogError {
  code: string;
  message: string;
  field?: string;
}

export interface BlogApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: BlogError;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// Form Types for Admin/CMS
export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categoryId: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string; // ISO string format for forms
  credits?: {
    originalAuthor: string;
    originalSource: string;
    sourceUrl: string;
    licenseType: string;
    creditText: string;
    translatedFrom: string;
    adaptedFrom: string;
  };
}

export interface BlogFormValidation {
  title: string[];
  slug: string[];
  content: string[];
  categoryId: string[];
  metaTitle: string[];
  metaDescription: string[];
  [key: string]: string[];
}

// Constants
export const BLOG_CONSTANTS = {
  MAX_TITLE_LENGTH: 100,
  MAX_EXCERPT_LENGTH: 300,
  MAX_META_TITLE_LENGTH: 60,
  MAX_META_DESCRIPTION_LENGTH: 160,
  MIN_CONTENT_LENGTH: 100,
  MAX_SLUG_LENGTH: 50,
  MAX_TAGS_PER_BLOG: 10,
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

export const BLOG_LICENSE_TYPES = [
  "CC BY",
  "CC BY-SA",
  "CC BY-NC",
  "CC BY-NC-SA",
  "CC BY-ND",
  "CC BY-NC-ND",
  "MIT",
  "Apache 2.0",
  "GPL",
  "Fair Use",
  "All Rights Reserved",
  "Custom",
] as const;

export type BlogLicenseType = (typeof BLOG_LICENSE_TYPES)[number];
