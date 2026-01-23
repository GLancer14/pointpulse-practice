import { Route, Routes } from "react-router";
import { Main } from "../../Pages/Main";
import { TaskView } from "../../Pages/TaskView";
import { TaskCreate } from "../../Pages/TaskCreate";
import { TaskEdit } from "../../Pages/TaskEdit";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/task/view/:id" element={<TaskView />} />
      <Route path="/task/create" element={<TaskCreate />} />
      <Route path="/task/update/:id" element={<TaskEdit />} />
    </Routes>
  );
}

export default Router;