import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio perferendis, rerum iusto magni dolores quas, nisi cumque, facere laboriosam ullam possimus! Ducimus nostrum aliquam harum aliquid animi quisquam pariatur cumque atque sequi, modi at saepe blanditiis iure culpa ullam sit totam dolores incidunt a autem consectetur sed. Reiciendis, necessitatibus? Nemo!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;