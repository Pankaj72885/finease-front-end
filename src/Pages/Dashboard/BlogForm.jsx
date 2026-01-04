import { useMyBlogs } from "@/Hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState } from "react";

export default function BlogForm({ initialData, onCancel, onSuccess }) {
  const { createBlog, updateBlog, isCreating, isUpdating } = useMyBlogs();
  const isEditing = !!initialData;
  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    tags: initialData?.tags?.join(", ") || "",
    coverImage: initialData?.coverImage || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await updateBlog({ id: initialData._id, data });
      } else {
        await createBlog(data);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-xl font-bold font-outfit">
            {isEditing ? "Edit Article" : "New Article"}
          </h2>
          <p className="text-muted-foreground text-sm">
            Share your insights with the world
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card-base p-6 space-y-6 max-w-4xl"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                required
                className="bg-background h-10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select Category</option>
                <option value="Savings">Savings</option>
                <option value="Investing">Investing</option>
                <option value="Budgeting">Budgeting</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image URL</label>
            <Input
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-background h-10"
            />
            {formData.coverImage && (
              <div className="mt-2 h-48 w-full rounded-xl overflow-hidden bg-muted border border-border group relative">
                <img
                  src={formData.coverImage}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Short Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary used in previews (1-2 sentences)..."
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here..."
              className="flex min-h-[350px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono leading-relaxed resize-y"
              required
            />
            <p className="text-xs text-muted-foreground">
              Markdown formatting is supported.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tags (comma separated)
            </label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Finance, Tips, tutorial"
              className="bg-background h-10"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-primary min-w-[140px] rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Article" : "Publish Article"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
