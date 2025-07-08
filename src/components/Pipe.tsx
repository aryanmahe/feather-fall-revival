
interface PipeProps {
  x: number;
  gapY: number;
  gapHeight: number;
  gameHeight: number;
  width: number;
}

export const Pipe = ({ x, gapY, gapHeight, gameHeight, width }: PipeProps) => {
  return (
    <>
      {/* Top pipe */}
      <div
        className="absolute bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-700"
        style={{
          left: `${x}px`,
          top: 0,
          width: `${width}px`,
          height: `${gapY}px`,
        }}
      >
        {/* Pipe cap */}
        <div 
          className="absolute bottom-0 bg-gradient-to-r from-green-400 to-green-500 border-2 border-green-700"
          style={{
            left: '-4px',
            width: `${width + 8}px`,
            height: '20px'
          }}
        ></div>
      </div>
      
      {/* Bottom pipe */}
      <div
        className="absolute bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-700"
        style={{
          left: `${x}px`,
          top: `${gapY + gapHeight}px`,
          width: `${width}px`,
          height: `${gameHeight - (gapY + gapHeight) - 64}px`, // 64px for ground
        }}
      >
        {/* Pipe cap */}
        <div 
          className="absolute top-0 bg-gradient-to-r from-green-400 to-green-500 border-2 border-green-700"
          style={{
            left: '-4px',
            width: `${width + 8}px`,
            height: '20px'
          }}
        ></div>
      </div>
    </>
  );
};
