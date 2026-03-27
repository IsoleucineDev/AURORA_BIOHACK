import React from 'react';

/**
 * Frutiger Aero floating bubbles background
 * Creates animated bubbles with glossy effect
 */
export const FrutigerBubbles: React.FC = () => {
  const bubbles = [
    { size: 120, left: '10%', delay: 0, duration: 20 },
    { size: 80, left: '25%', delay: 2, duration: 18 },
    { size: 150, left: '45%', delay: 4, duration: 22 },
    { size: 100, left: '60%', delay: 1, duration: 19 },
    { size: 90, left: '75%', delay: 3, duration: 21 },
    { size: 110, left: '85%', delay: 5, duration: 23 },
    { size: 70, left: '15%', delay: 6, duration: 17 },
    { size: 130, left: '35%', delay: 2, duration: 20 },
    { size: 95, left: '70%', delay: 4, duration: 19 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-30"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            bottom: '-150px',
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.8), 
              rgba(79, 195, 247, 0.4) 40%, 
              rgba(33, 150, 243, 0.3) 70%,
              transparent 100%)`,
            boxShadow: `
              inset -10px -10px 30px rgba(255, 255, 255, 0.5),
              0 10px 30px rgba(33, 150, 243, 0.2)
            `,
            animation: `floatUp ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            backdropFilter: 'blur(2px)',
          }}
        />
      ))}
      
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) scale(1.1);
            opacity: 0.25;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) translateX(-10px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
