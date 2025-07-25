import React from "react";

function ParticlesBackground() {
  React.useEffect(() => {
    const container = document.getElementById("particles-background");
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = "";

    const count = 30;
    const color = "rgba(0, 191, 255, 0.2)";
    const minSize = 2;
    const maxSize = 5;
    const speed = 1;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random size between minSize and maxSize
      const size = Math.random() * (maxSize - minSize) + minSize;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Set color
      particle.style.backgroundColor = color;

      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random animation duration based on speed
      const duration = (Math.random() * 20 + 10) / speed;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 10}s`;

      container.appendChild(particle);
    }
  }, []);

  return (
    <div
      id="particles-background"
      className="fixed inset-0 z-0 opacity-30 pointer-events-none"
    ></div>
  );
}

export default ParticlesBackground;
