interface AnimatedBackgroundProps {
  mousePosition: { x: number; y: number };
}

export function AnimatedBackground({ mousePosition }: AnimatedBackgroundProps) {
  return (
    <div className="animatedBackground">
      <div className="gradientMesh" />
      <div 
        className="floatingOrb orb1" 
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      <div 
        className="floatingOrb orb2" 
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      />
      <div 
        className="floatingOrb orb3" 
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
        }}
      />
    </div>
  );
}
