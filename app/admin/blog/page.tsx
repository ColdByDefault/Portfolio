/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  FileText,
  Globe,
  Calendar,
  TrendingUp,
} from "lucide-react";
import type {
  BlogAdminStats,
  BlogAdminResponse,
  ApiErrorResponse,
} from "@/types/admin";
import type { Blog, BlogListResponse } from "@/types/blogs";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  language: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const initialFormData: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  language: "en",
  metaTitle: "",
  metaDescription: "",
  isPublished: false,
  isFeatured: false,
};

export default function AdminBlogPage() {
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [stats, setStats] = useState<BlogAdminStats | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<
    BlogListResponse["pagination"] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [filterPublished, setFilterPublished] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);

  const handleError = useCallback((error: unknown, context: string): void => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    setMessage(`${context}: ${errorMessage}`);
    console.error("%s:", context, error);
  }, []);

  const isValidErrorResponse = (data: unknown): data is ApiErrorResponse => {
    return (
      typeof data === "object" &&
      data !== null &&
      ("message" in data || "error" in data)
    );
  };

  const getErrorMessage = useCallback(
    (data: unknown, defaultMessage: string): string => {
      if (isValidErrorResponse(data)) {
        return String(data.message || data.error || defaultMessage);
      }
      return defaultMessage;
    },
    []
  );

  const loadStats = useCallback(async (): Promise<void> => {
    if (!isAuthenticated || !token) return;

    try {
      const response = await fetch("/api/admin/blog?action=stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = (await response.json()) as BlogAdminResponse;
        if (data.success && data.data) {
          setStats(data.data as BlogAdminStats);
        }
      }
    } catch (error) {
      handleError(error, "Error loading stats");
    }
  }, [token, isAuthenticated, handleError]);

  const loadBlogs = useCallback(async (): Promise<void> => {
    if (!isAuthenticated || !token) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        action: "list",
        page: currentPage.toString(),
        limit: "20",
      });

      if (searchQuery) params.append("search", searchQuery);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (filterPublished) params.append("published", filterPublished);

      const response = await fetch(`/api/admin/blog?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = (await response.json()) as BlogAdminResponse;
        if (data.success && data.data) {
          const blogData = data.data as BlogListResponse;
          setBlogs(blogData.blogs);
          setPagination(blogData.pagination);
        }
      } else {
        const errorData = (await response
          .json()
          .catch(() => ({ error: "Failed to load blogs" }))) as unknown;
        setMessage(getErrorMessage(errorData, "Failed to load blogs"));
      }
    } catch (error) {
      handleError(error, "Error loading blogs");
    } finally {
      setLoading(false);
    }
  }, [
    token,
    isAuthenticated,
    currentPage,
    searchQuery,
    selectedLanguage,
    filterPublished,
    handleError,
    getErrorMessage,
  ]);

  const loadData = useCallback(async (): Promise<void> => {
    await Promise.all([loadStats(), loadBlogs()]);
    setLastRefresh(new Date());
  }, [loadStats, loadBlogs]);

  const authenticate = useCallback(async (): Promise<void> => {
    if (!token.trim()) {
      setMessage("Please enter a valid token");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/blog?action=stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setMessage("Authenticated successfully");
        await loadData();
      } else {
        const errorData = (await response
          .json()
          .catch(() => ({ message: "Invalid token" }))) as unknown;
        setMessage(getErrorMessage(errorData, "Invalid token"));
      }
    } catch (error) {
      handleError(error, "Authentication failed");
    } finally {
      setLoading(false);
    }
  }, [token, handleError, loadData, getErrorMessage]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === "Enter" && !loading) {
        void authenticate();
      }
    },
    [authenticate, loading]
  );

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleFormChange = (
    field: keyof BlogFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Auto-generate slug when title changes
      if (field === "title" && typeof value === "string") {
        newData.slug = generateSlug(value);
      }

      return newData;
    });
  };

  const submitBlog = useCallback(
    async (action: "create" | "update"): Promise<void> => {
      if (!isAuthenticated || !token) return;

      setLoading(true);
      try {
        const payload = {
          action,
          ...(action === "update" && editingBlog && { blogId: editingBlog.id }),
          data: {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt || undefined,
            content: formData.content,
            featuredImage: formData.featuredImage || undefined,
            language: formData.language,
            metaTitle: formData.metaTitle || undefined,
            metaDescription: formData.metaDescription || undefined,
            isPublished: formData.isPublished,
            isFeatured: formData.isFeatured,
          },
        };

        const response = await fetch("/api/admin/blog", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = (await response.json()) as BlogAdminResponse;
          setMessage(
            (data as { message?: string }).message ||
              `Blog ${action}d successfully`
          );
          setFormData(initialFormData);
          setEditingBlog(null);
          setIsCreateDialogOpen(false);
          await loadData();
        } else {
          const errorData = (await response
            .json()
            .catch(() => ({ error: `Error ${action}ing blog` }))) as unknown;
          setMessage(getErrorMessage(errorData, `Error ${action}ing blog`));
        }
      } catch (error) {
        handleError(error, `Error ${action}ing blog`);
      } finally {
        setLoading(false);
      }
    },
    [
      isAuthenticated,
      token,
      formData,
      editingBlog,
      handleError,
      loadData,
      getErrorMessage,
    ]
  );

  const deleteBlog = useCallback(
    async (blogId: string): Promise<void> => {
      if (!isAuthenticated || !token) return;
      if (!confirm("Are you sure you want to delete this blog?")) return;

      setLoading(true);
      try {
        const response = await fetch("/api/admin/blog", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "delete", blogId }),
        });

        if (response.ok) {
          setMessage("Blog deleted successfully");
          await loadData();
        } else {
          const errorData = (await response
            .json()
            .catch(() => ({ error: "Error deleting blog" }))) as unknown;
          setMessage(getErrorMessage(errorData, "Error deleting blog"));
        }
      } catch (error) {
        handleError(error, "Error deleting blog");
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, token, handleError, loadData, getErrorMessage]
  );

  const toggleBlogStatus = useCallback(
    async (
      blogId: string,
      action: "publish" | "unpublish" | "feature" | "unfeature"
    ): Promise<void> => {
      if (!isAuthenticated || !token) return;

      setLoading(true);
      try {
        const response = await fetch("/api/admin/blog", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action, blogId }),
        });

        if (response.ok) {
          const data = (await response.json()) as BlogAdminResponse;
          setMessage(
            (data as { message?: string }).message ||
              `Blog ${action}ed successfully`
          );
          await loadData();
        } else {
          const errorData = (await response
            .json()
            .catch(() => ({ error: `Error ${action}ing blog` }))) as unknown;
          setMessage(getErrorMessage(errorData, `Error ${action}ing blog`));
        }
      } catch (error) {
        handleError(error, `Error ${action}ing blog`);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, token, handleError, loadData, getErrorMessage]
  );

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      featuredImage: blog.featuredImage || "",
      language: blog.language,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      isPublished: blog.isPublished,
      isFeatured: blog.isFeatured,
    });
    setIsCreateDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingBlog(null);
    setFormData(initialFormData);
    setIsCreateDialogOpen(true);
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      void loadBlogs();
    }
  }, [
    currentPage,
    searchQuery,
    selectedLanguage,
    filterPublished,
    isAuthenticated,
    token,
    loadBlogs,
  ]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Blog Admin Authentication
            </CardTitle>
            <CardDescription>
              Enter your admin token to access blog management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={() => void authenticate()}
              className="w-full"
              disabled={loading}
            >
              Authenticate
            </Button>
            {message && (
              <p
                className={`text-sm ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Management Dashboard</h1>
            {lastRefresh && (
              <p className="text-sm text-muted-foreground mt-1">
                Last refreshed: {lastRefresh.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => void loadData()} variant="outline">
              Refresh Data
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Blog
            </Button>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("success") || message.includes("Authenticated")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Blogs
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBlogs}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <Globe className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.publishedBlogs}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.draftBlogs}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured</CardTitle>
                <Star className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.featuredBlogs}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalViews}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="sv">Swedish</option>
              </select>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={filterPublished}
                onChange={(e) => setFilterPublished(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLanguage("");
                  setFilterPublished("");
                  setCurrentPage(1);
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blogs List */}
        <Card>
          <CardHeader>
            <CardTitle>Blogs</CardTitle>
            <CardDescription>
              {pagination && `${pagination.total} total blogs`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No blogs found
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          /{blog.slug}
                        </p>
                        {blog.excerpt && (
                          <p className="text-sm mt-2 text-muted-foreground">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            {blog.language.toUpperCase()}
                          </Badge>
                          {blog.isPublished ? (
                            <Badge variant="default" className="bg-green-500">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                          {blog.isFeatured && (
                            <Badge variant="default" className="bg-purple-500">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline">
                            {blog.readCount} views
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            void toggleBlogStatus(
                              blog.id,
                              blog.isPublished ? "unpublish" : "publish"
                            )
                          }
                        >
                          {blog.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            void toggleBlogStatus(
                              blog.id,
                              blog.isFeatured ? "unfeature" : "feature"
                            )
                          }
                        >
                          {blog.isFeatured ? (
                            <StarOff className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => void deleteBlog(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
              <DialogDescription>
                {editingBlog
                  ? "Update the blog details below."
                  : "Fill in the details to create a new blog."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="Blog title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleFormChange("slug", e.target.value)}
                    placeholder="blog-slug"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => handleFormChange("excerpt", e.target.value)}
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content *</label>
                <textarea
                  className="w-full h-40 p-3 border rounded-md"
                  value={formData.content}
                  onChange={(e) => handleFormChange("content", e.target.value)}
                  placeholder="Blog content (Markdown supported)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Featured Image URL
                  </label>
                  <Input
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleFormChange("featuredImage", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <select
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.language}
                    onChange={(e) =>
                      handleFormChange("language", e.target.value)
                    }
                  >
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="sv">Swedish</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input
                    value={formData.metaTitle}
                    onChange={(e) =>
                      handleFormChange("metaTitle", e.target.value)
                    }
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Meta Description
                  </label>
                  <Input
                    value={formData.metaDescription}
                    onChange={(e) =>
                      handleFormChange("metaDescription", e.target.value)
                    }
                    placeholder="SEO description"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      handleFormChange("isPublished", e.target.checked)
                    }
                  />
                  <span className="text-sm">Published</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      handleFormChange("isFeatured", e.target.checked)
                    }
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    void submitBlog(editingBlog ? "update" : "create")
                  }
                  disabled={loading || !formData.title || !formData.content}
                >
                  {editingBlog ? "Update" : "Create"} Blog
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
