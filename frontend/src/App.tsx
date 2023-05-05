import FormQuestions from "./pages/FormQuestions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
function App() {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-slate-100">
			<div className="container mx-auto flex justify-center">
				<RouterProvider
					router={createBrowserRouter([
						{ path: "/questions-form", element: <FormQuestions /> },
						{ path: "/", element: <Welcome /> },
						{ path: "/quiz", element: <Quiz /> },
						{ path: "/result", element: <Result /> },
						{ path: "/login", element: <Login /> },
						{ path: "/signup", element: <Signup /> },
					])}
				/>
			</div>
		</div>
	);
}

export default App;
