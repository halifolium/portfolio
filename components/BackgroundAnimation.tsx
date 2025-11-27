export default function BackgroundAnimation() {
  return (
    <div className="bg-animation">
      <div className="sakura-petals">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      <div className="glow-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
    </div>
  );
}

