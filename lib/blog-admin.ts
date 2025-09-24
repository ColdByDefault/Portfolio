/**
 * Blog Administration Service - Orchestrator
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type {
  Blog,
  CreateBlogRequest,
  UpdateBlogRequest,
  BlogListQuery,
  BlogListResponse,
} from "@/types/blogs";
import type { BlogAdminStats } from "@/types/admin";
import { BlogAdminService } from "./blog-admin/BlogAdminService";
import type { AdminContext } from "./blog-admin/BlogValidationService";

// Export all functions using the service layer while maintaining the same API

/**
 * Get admin statistics
 */
export async function getBlogAdminStats(
  context: AdminContext
): Promise<BlogAdminStats> {
  return BlogAdminService.getBlogAdminStats(context);
}

/**
 * Get all blogs for admin (including drafts)
 */
export async function getAdminBlogs(
  context: AdminContext,
  query?: BlogListQuery
): Promise<BlogListResponse> {
  return BlogAdminService.getAdminBlogs(context, query);
}

/**
 * Create a new blog
 */
export async function createBlog(
  context: AdminContext,
  data: CreateBlogRequest
): Promise<Blog> {
  return BlogAdminService.createBlog(context, data);
}

/**
 * Update an existing blog
 */
export async function updateBlog(
  context: AdminContext,
  id: string,
  data: UpdateBlogRequest
): Promise<Blog> {
  return BlogAdminService.updateBlog(context, id, data);
}

/**
 * Delete a blog
 */
export async function deleteBlog(
  context: AdminContext,
  id: string
): Promise<void> {
  return BlogAdminService.deleteBlog(context, id);
}

/**
 * Get a blog by ID for admin
 */
export async function getAdminBlogById(
  context: AdminContext,
  id: string
): Promise<Blog | null> {
  return BlogAdminService.getAdminBlogById(context, id);
}

/**
 * Check rate limit for admin operations
 */
export function checkAdminRateLimit(clientIP: string): boolean {
  return BlogAdminService.checkAdminRateLimit(clientIP);
}

/**
 * Get all categories for admin forms
 */
export async function getAdminCategories(context: AdminContext) {
  return BlogAdminService.getAdminCategories(context);
}

/**
 * Get all tags for admin forms
 */
export async function getAdminTags(context: AdminContext) {
  return BlogAdminService.getAdminTags(context);
}

// Export the AdminContext type for use in API routes
export type { AdminContext };
