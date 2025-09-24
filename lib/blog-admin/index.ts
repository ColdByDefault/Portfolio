/**
 * Blog Admin Services - Main exports
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

// Main service
export { BlogAdminService } from "./BlogAdminService";

// Individual services (for direct use if needed)
export { BlogValidationService } from "./BlogValidationService";
export { BlogUtilityService } from "./BlogUtilityService";
export { BlogQueryService } from "./BlogQueryService";

// Types
export type { AdminContext } from "./BlogValidationService";

// Re-export the main functions with the same API as before
export {
  BlogAdminService as getBlogAdminStats,
  BlogAdminService as getAdminBlogs,
  BlogAdminService as createBlog,
  BlogAdminService as updateBlog,
  BlogAdminService as deleteBlog,
  BlogAdminService as getAdminBlogById,
  BlogAdminService as checkAdminRateLimit,
  BlogAdminService as getAdminCategories,
  BlogAdminService as getAdminTags,
} from "./BlogAdminService";
