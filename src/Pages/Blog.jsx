import { ArrowRight, Calendar, Clock, Search, Tag, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "budgeting", label: "Budgeting" },
    { id: "savings", label: "Savings" },
    { id: "investing", label: "Investing" },
    { id: "tips", label: "Tips & Tricks" },
  ];

  const posts = [
    {
      id: 1,
      title: "10 Budgeting Tips That Actually Work in 2026",
      excerpt:
        "Discover practical budgeting strategies that help thousands of people save more money and achieve their financial goals. Learn how to create a budget that works for your lifestyle.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
      author: "Sarah Johnson",
      date: "Jan 2, 2026",
      readTime: "5 min read",
      category: "budgeting",
    },
    {
      id: 2,
      title: "Understanding Your Spending Patterns",
      excerpt:
        "Learn how to analyze your spending habits and use data-driven insights to make smarter financial decisions. Your spending tells a story - here's how to read it.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      author: "Michael Chen",
      date: "Dec 28, 2025",
      readTime: "7 min read",
      category: "tips",
    },
    {
      id: 3,
      title: "The Complete Guide to Emergency Funds",
      excerpt:
        "Everything you need to know about building and maintaining an emergency fund for financial security. Don't let unexpected expenses derail your finances.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      author: "Emily Rodriguez",
      date: "Dec 20, 2025",
      readTime: "8 min read",
      category: "savings",
    },
    {
      id: 4,
      title: "How to Track Expenses Like a Pro",
      excerpt:
        "Master the art of expense tracking with these professional tips. From categorization to automation, learn the tools that financial experts use.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60",
      author: "David Kim",
      date: "Dec 15, 2025",
      readTime: "6 min read",
      category: "tips",
    },
    {
      id: 5,
      title: "Beginner's Guide to Investing",
      excerpt:
        "Start your investment journey with confidence. This comprehensive guide covers the basics of investing for beginners, from stocks to index funds.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
      author: "Lisa Thompson",
      date: "Dec 10, 2025",
      readTime: "10 min read",
      category: "investing",
    },
    {
      id: 6,
      title: "50/30/20 Rule: The Ultimate Budgeting Framework",
      excerpt:
        "Learn how to apply the famous 50/30/20 budgeting rule to your finances. This simple framework can transform your financial life.",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=60",
      author: "James Wilson",
      date: "Dec 5, 2025",
      readTime: "5 min read",
      category: "budgeting",
    },
    {
      id: 7,
      title: "Automating Your Savings: Set It and Forget It",
      excerpt:
        "Discover how automation can help you save money without thinking about it. Set up systems that grow your wealth on autopilot.",
      image:
        "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&auto=format&fit=crop&q=60",
      author: "Sarah Johnson",
      date: "Nov 28, 2025",
      readTime: "6 min read",
      category: "savings",
    },
    {
      id: 8,
      title: "Common Financial Mistakes to Avoid",
      excerpt:
        "Learn from others' mistakes. These are the most common financial errors people make and how you can avoid them to stay on track.",
      image:
        "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=60",
      author: "Michael Chen",
      date: "Nov 20, 2025",
      readTime: "7 min read",
      category: "tips",
    },
    {
      id: 9,
      title: "Building Passive Income Streams",
      excerpt:
        "Explore different ways to create passive income that can supplement your salary and build long-term wealth.",
      image:
        "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop&q=60",
      author: "Emily Rodriguez",
      date: "Nov 15, 2025",
      readTime: "9 min read",
      category: "investing",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Tag size={16} />
              <span>Financial Insights</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6">
              FinEase <span className="text-gradient">Blog</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Expert tips, guides, and insights to help you master your personal
              finances and achieve your financial goals.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No articles found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="text-primary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full capitalize">
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
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all"
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold font-outfit mb-4">
            Never Miss an Update
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for weekly financial tips and insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-base flex-1"
            />
            <button className="btn-primary px-6 py-3 rounded-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

Component.displayName = "BlogPage";
