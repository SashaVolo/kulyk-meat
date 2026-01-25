export default function Separator() {
  return (
    <div className="w-full bg-white">
      <div 
        className="w-full h-10 md:h-16 bg-contain bg-repeat-x bg-center"
        style={{ backgroundImage: "url('/v1.png')" }}
      ></div>
    </div>
  );
}