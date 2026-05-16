import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Enterprise Performance <br/>
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Reimagined.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Align teams, track goals, and drive execution with Thryve's intelligent performance management platform.
        </p>
        <Link to="/login" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-lg transition-all shadow-[0_0_30px_rgba(139,127,255,0.4)] hover:shadow-[0_0_40px_rgba(139,127,255,0.6)]">
          Enter Portal
        </Link>
      </div>
    </div>
  );
}
