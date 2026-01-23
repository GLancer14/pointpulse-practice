import { Route, Routes } from "react-router";
import { Main } from "../../Pages/Main";
import { TaskView } from "../../Pages/TaskView";
import { TaskCreate } from "../../Pages/TaskCreate";
import { TaskEdit } from "../../Pages/TaskEdit";
import { PageLayout } from "../../Pages/PageLayout/PageLayout/PageLayout";

function Router() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/task/view/:id" element={<TaskView />} />
        <Route path="/task/create" element={<TaskCreate />} />
        <Route path="/task/update/:id" element={<TaskEdit />} />
      </Route>
    </Routes>
  );
}

export default Router;