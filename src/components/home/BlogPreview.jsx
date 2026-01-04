import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router";

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "10 Budgeting Tips That Actually Work in 2026",
      excerpt:
        "Discover practical budgeting strategies that help thousands of people save more money and achieve their financial goals.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
      author: "Sarah Johnson",
      date: "Jan 2, 2026",
      readTime: "5 min read",
      category: "Budgeting",
    },
    {
      id: 2,
      title: "Understanding Your Spending Patterns",
      excerpt:
        "Learn how to analyze your spending habits and use data-driven insights to make smarter financial decisions.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      author: "Michael Chen",
      date: "Dec 28, 2025",
      readTime: "7 min read",
      category: "Analytics",
    },
    {
      id: 3,
      title: "The Complete Guide to Emergency Funds",
      excerpt:
        "Everything you need to know about building and maintaining an emergency fund for financial security.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      author: "Emily Rodriguez",
      date: "Dec 20, 2025",
      readTime: "8 min read",
      category: "Savings",
    },
  ];

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
          {posts.map((post) => (
            <article
              key={post.id}
              className="group card-interactive overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
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
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
