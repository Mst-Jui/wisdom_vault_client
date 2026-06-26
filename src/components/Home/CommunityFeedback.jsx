export default function CommunityFeedback() {
  const testimonials = [
    {
      name: "Rahim Ahmed",
      role: "Frontend Developer",
      feedback:
        "This platform completely changed how I learn. The lessons are practical and easy to follow.",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Nusrat Jahan",
      role: "UI/UX Designer",
      feedback:
        "I love the clean UI and structured content. It feels like a real community of learners.",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Tanvir Hasan",
      role: "Full Stack Developer",
      feedback:
        "The community support is amazing. Whenever I get stuck, I always find help here.",
      avatar: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Sadia Islam",
      role: "Student",
      feedback:
        "Perfect for beginners. Everything is explained in a very simple and friendly way.",
      avatar: "https://i.pravatar.cc/100?img=45",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What Our
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
              Community Says
            </span>
          </h2>
          <p className="text-gray-400 mt-3">
            Real feedback from real learners around the world
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 hover:border-gray-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              {/* Quote */}
              <p className="text-gray-400 text-sm leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}