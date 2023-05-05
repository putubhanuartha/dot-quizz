import { Link } from "react-router-dom";
function Welcome() {
	return (
		<div className="p-5 bg-white shadow-md rounded-md">
			<h1 className="font-semibold text-xl">Welcome to DOT Quizz App</h1>
      <p>You must login first to do the quizz</p>
      <div className="flex items-center gap-x-3 mt-9">
          <Link  className="px-2 py-1 border-[0.5px] border-slate-500 hover:bg-slate-500 hover:text-slate-100 transition-all duration-200 rounded-lg" to={'/login'}>Login</Link>
          <Link  className="px-2 py-1 border-[0.5px] border-slate-500 hover:bg-slate-500 hover:text-slate-100 transition-all duration-200 rounded-lg" to={'/signup'}>Signup</Link>
      </div>
		</div>
	);
}

export default Welcome;
