import { Button } from "@/components/ui/button";
import { useBlog } from "@/Hooks/useBlogs";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Markdown from "react-markdown";
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
    <div className="min-h-screen pt-24 pb-20 bg-background relative selection:bg-primary/20">
      {/* Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-primary/5 to-transparent -z-10" />

      <div className="container max-w-4xl px-4 mx-auto">
        {/* Navigation */}
        <Button
          variant="ghost"
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors group"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Blogs
        </Button>

        {/* Article Header */}
        <header className="mb-12 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {blog.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-8 leading-tight tracking-tight text-foreground">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm font-medium border-y border-border/50 py-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              {blog.author?.photo ? (
                <img
                  src={blog.author.photo}
                  className="w-10 h-10 rounded-full border-2 border-background ring-2 ring-border/50 object-cover"
                  alt={blog.author?.name}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white ring-2 ring-border/50">
                  <User size={18} />
                </div>
              )}
              <span className="text-foreground">{blog.author?.name}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary/70" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-primary/70" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl ring-1 ring-border/50 animate-in zoom-in-95 duration-700 delay-100 bg-muted">
          <img
            src={blog.coverImage || "https://placehold.co/1200x630"}
            alt={blog.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]"
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg dark:prose-invert prose-headings:font-outfit prose-headings:font-bold prose-p:leading-8 prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg">
            <Markdown>{blog.content}</Markdown>
          </article>

          {/* Tags Footer */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
