import { Button } from "@/components/ui/button";
import { useBlog } from "@/Hooks/useBlogs";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function BlogDetails() {
  const { id } = useParams();
  const { blog, isLoading } = useBlog(id);
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="min-h-screen pt-32 text-center text-muted-foreground animate-pulse">
        Loading article...
      </div>
    );
  if (!blog)
    return (
      <div className="min-h-screen pt-32 text-center text-destructive">
        Blog post not found
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative">
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-primary/5 to-transparent -z-10" />

      <div className="container max-w-4xl px-4">
        <Button
          variant="ghost"
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Blogs
        </Button>

        {/* Header */}
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {blog.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              {blog.author?.photo ? (
                <img
                  src={blog.author.photo}
                  className="w-8 h-8 rounded-full border border-border"
                  alt={blog.author?.name}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                  <User size={14} />
                </div>
              )}
              <span className="font-medium text-foreground">
                {blog.author?.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-border/50 animate-in zoom-in-95 duration-700 delay-100">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-outfit prose-primary prose-img:rounded-xl">
          {/* Simple formatting: preserving simple HTML structure if present, or newlines */}
          <div className="whitespace-pre-line leading-relaxed text-muted-foreground text-lg">
            {blog.content}
          </div>
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary cursor-default transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
