import React from "react";

const features = [
  {
    title: "Instant URL Shortening",
    description: "Shorten long URLs in one click — instantly and reliably.",
    icon: "⚡",
  },
  {
    title: "Click Analytics",
    description: "Track clicks, countries, devices, and more — detailed stats at your fingertips.",
    icon: "📊",
  },
  {
    title: "Mobile-Friendly",
    description: "Optimized for all screen sizes — shorten and track links on the go.",
    icon: "📱",
  },
  {
    title: "Secure & Private",
    description: "HTTPS-protected links and secure backend infrastructure.",
    icon: "🔒",
  },
  {
    title: "Custom Aliases",
    description: "Personalize your shortened URLs with custom names.",
    icon: "🎯",
  },
  {
    title: "Completely Free",
    description: "All features available completely free.",
    icon: "💸",
  },
];

const Services = () => {
  return (
    <section className="py-20 px-4 ">
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
        What You’ll Get
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
