import {
  Briefcase,
  Car,
  Coffee,
  Film,
  Gift,
  GraduationCap,
  Heart,
  Home,
  Package,
  Plane,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: ShoppingBag,
      name: "Shopping",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      transactions: "1.2k",
    },
    {
      icon: Utensils,
      name: "Food & Dining",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      transactions: "2.5k",
    },
    {
      icon: Car,
      name: "Transportation",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      transactions: "890",
    },
    {
      icon: Home,
      name: "Housing",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
      transactions: "450",
    },
    {
      icon: Film,
      name: "Entertainment",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      transactions: "780",
    },
    {
      icon: Heart,
      name: "Healthcare",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      transactions: "320",
    },
    {
      icon: GraduationCap,
      name: "Education",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      transactions: "560",
    },
    {
      icon: Plane,
      name: "Travel",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-500/10",
      transactions: "230",
    },
    {
      icon: Coffee,
      name: "Subscriptions",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      transactions: "1.1k",
    },
    {
      icon: Gift,
      name: "Gifts",
      color: "from-fuchsia-500 to-pink-500",
      bgColor: "bg-fuchsia-500/10",
      transactions: "190",
    },
    {
      icon: Briefcase,
      name: "Business",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-500/10",
      transactions: "670",
    },
    {
      icon: Package,
      name: "Others",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
      transactions: "840",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/20" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span>Smart Categories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Track Every Expense by{" "}
            <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Organize your transactions into meaningful categories for better
            insights and smarter budgeting.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group card-interactive p-4 text-center hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    size={24}
                    className={`bg-gradient-to-r ${category.color} [background-clip:text] [-webkit-background-clip:text]`}
                    style={{
                      color: category.color.includes("pink")
                        ? "#ec4899"
                        : category.color.includes("orange")
                        ? "#f97316"
                        : category.color.includes("blue")
                        ? "#3b82f6"
                        : category.color.includes("purple")
                        ? "#a855f7"
                        : category.color.includes("red")
                        ? "#ef4444"
                        : category.color.includes("emerald")
                        ? "#10b981"
                        : category.color.includes("violet")
                        ? "#8b5cf6"
                        : category.color.includes("sky")
                        ? "#0ea5e9"
                        : category.color.includes("amber")
                        ? "#f59e0b"
                        : category.color.includes("fuchsia")
                        ? "#d946ef"
                        : category.color.includes("slate")
                        ? "#64748b"
                        : "#14b8a6",
                    }}
                  />
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>

                {/* Transaction Count */}
                <p className="text-xs text-muted-foreground">
                  {category.transactions} txns
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Create custom categories that match your lifestyle and spending habits
        </p>
      </div>
    </section>
  );
};

export default Categories;
