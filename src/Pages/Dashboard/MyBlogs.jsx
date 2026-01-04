import { useMyBlogs } from "@/Hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import BlogForm from "./BlogForm";

export default function MyBlogs() {
  const { blogs, isLoading, deleteBlog } = useMyBlogs();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      await deleteBlog(id);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setIsFormOpen(true);
  };

  if (isFormOpen) {
    return (
      <div className="animate-in fade-in slide-in-from-right duration-300">
        <BlogForm
          initialData={editingBlog}
          onCancel={() => setIsFormOpen(false)}
          onSuccess={() => setIsFormOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-outfit">My Blogs</h1>
          <p className="text-muted-foreground">
            Manage your articles and public posts
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="rounded-xl bg-gradient-primary hover:shadow-glow transition-all"
        >
          <Plus size={18} className="mr-2" /> Write New Article
        </Button>
      </div>

      {/* List */}
      <div className="card-base overflow-hidden border border-border bg-card shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">
              Loading your articles...
            </span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
              <FileText size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                No articles yet
              </p>
              <p>Share your financial journey with the community.</p>
            </div>
            <Button variant="outline" onClick={handleCreate} className="mt-2">
              Start writing
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Article
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Published
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={blog.coverImage || "https://placehold.co/100"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs lg:max-w-md">
                          <div className="font-semibold text-sm truncate">
                            {blog.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {blog.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/blog/${blog._id}`} target="_blank">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <Eye size={16} />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-blue-500"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
