import { useBlogs } from "@/Hooks/useBlogs";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router";

const BlogPreview = () => {
  const { blogs, isLoading } = useBlogs();
  const posts = blogs?.slice(0, 3) || [];

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
              <span>Financial Insights</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit">
              Latest from Our <span className="text-gradient">Blog</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted/20 animate-pulse rounded-2xl"
                />
              ))
            : posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post._id}`}
                  className="group card-interactive overflow-hidden flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={post.coverImage || "https://placehold.co/600x400"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border mt-auto">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {post.author?.name || "Admin"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
