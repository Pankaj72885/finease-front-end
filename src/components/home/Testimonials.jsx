import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content:
        "FinEase completely transformed how I manage my business finances. The visual reports help me make smarter decisions, and I've saved 40% more since I started using it. Highly recommended!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      content:
        "As a developer, I appreciate the clean interface and thoughtful UX. Tracking my expenses has never been easier. The category-wise breakdown is particularly useful for tax purposes.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      content:
        "I've tried many finance apps, but FinEase stands out with its simplicity and powerful features. The dark mode is gorgeous, and the reports are incredibly insightful!",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Manager",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      content:
        "The best part about FinEase is how it visualizes my spending patterns. I finally understand where my money goes each month. It's like having a personal financial advisor!",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Healthcare Professional",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      rating: 5,
      content:
        "FinEase helped me pay off my student loans faster by showing me exactly where I could cut back. The goal tracking feature is amazing. Couldn't be happier!",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 5,
      content:
        "Running multiple projects means managing complex finances. FinEase makes it simple with its intuitive categorization. Worth every penny of the premium plan!",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + 3
  );

  // If we don't have 3 testimonials, wrap around
  while (visibleTestimonials.length < 3) {
    const remaining = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
            <span>What Our Users Say</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit mb-4">
            Loved by <span className="text-gradient">Thousands</span> of Users
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our community has to
            say about their experience with FinEase.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors hidden lg:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors hidden lg:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="card-base p-6 relative group hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Quote size={18} className="text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
