'use client';

export default function SimpleBackground() {
  return (
    <div 
      className="fixed inset-0 -z-50"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(243, 232, 255, 0.3) 0%, 
            rgba(219, 234, 254, 0.3) 25%, 
            rgba(254, 240, 248, 0.3) 50%, 
            rgba(236, 253, 245, 0.3) 75%, 
            rgba(255, 251, 235, 0.3) 100%
          ),
          radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Optional: Add some subtle decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-24 h-24 bg-pink-100 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-green-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}
