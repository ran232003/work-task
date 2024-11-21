import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./global/NavigationBar";
import { Route, Routes } from "react-router-dom";
import ToastMessage from "./global/ToastMessage";
import Loading from "./global/LoadingSpinners";
import HomePage from "./pages/homepage/HomePage";
import About from "./pages/about/About";
import CreateTask from "./pages/createTask/CreateTask";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import { useApiHelper } from "./global/apiHelper";
import { LOGIN_URL } from "./URLS";
import { userAction } from "./store/userSlice";
import TaskDashboard from "./pages/taskDashboard/TaskDashboard";

function App() {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const getUser = () => {
    handleApiCall(
      "POST",
      LOGIN_URL,
      { email: "ran@gmail.com", password: "123456" },
      (data) => {
        dispatch(userAction.setUser(data.user));
      },
      () => {}
    );
    // const user = { userName: "Ran", email: "ran@email.com" };
    // dispatch(userAction.setUser(user));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        {" "}
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateTask" element={<CreateTask />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/:taskStatus" element={<TaskDashboard />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastMessage />
      <CreateTask />
      <Loading />
    </div>
  );
}

export default App;
