import { useBlogs } from "@/Hooks/useBlogs";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { Link } from "react-router";

import { useState } from "react";

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { blogs, isLoading } = useBlogs(
    selectedCategory === "All" ? {} : { category: selectedCategory }
  );

  const categories = [
    "All",
    "Budgeting",
    "Investing",
    "Savings",
    "Cryptocurrency",
    "Technology",
    "Retirement",
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-outfit bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
            Latest Insights
          </h1>
          <p className="text-muted-foreground text-lg">
            Tips, strategies, and guides to help you master your personal
            finances.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-muted/20 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : blogs && blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full animate-in fade-in zoom-in-50"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={blog.coverImage || "https://placehold.co/600x400"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-border shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-primary" />
                      <span>{blog.author?.name || "Admin"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {blog.readTime && (
                      <div className="ml-auto text-xs opacity-70">
                        {blog.readTime}
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors font-outfit">
                    {blog.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center text-primary font-medium text-sm mt-auto pt-4 border-t border-border/50">
                    Read Article{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-in fade-in zoom-in-50">
            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={40} className="text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Insights Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We haven't published any articles yet. Check back soon for fresh
              financial tips and strategies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
