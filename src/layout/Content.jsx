import { Route, Routes } from "react-router-dom";
// import CreateSale from 'src/pages/sales/CreateSale';
import Users from "../components/users";
import StudentCollection from "../pages/students/Student";
import ProfessorCollection from "../pages/Professor/Professor";
// import Sales from 'src/pages/sales/Sales';
// import TaskBoard from 'src/pages/task-board';
// import Customer from 'src/pages/customer';
// import Supplier from 'src/pages/supplier';
// import Product from 'src/pages/product';
// import Invoice from 'src/pages/invoice';
// import Purchase from 'src/pages/purchase';
// import ProfitLoss from 'src/pages/profit-loss/profit-lossFordialog';
// import UpdateCompamny from 'src/pages/company/updateCompany';

const Content = () => {
  return (
    <Routes>
      {/* <Route exact path="/tasks/:saleId" element={<TaskBoard />} /> */}
      <Route exact path="/" element={<Users />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/student" element={<StudentCollection />} />
      <Route exact path="/professor" element={<ProfessorCollection />} />
      {/* <Route exact path="/product" element={<Product />} />
      <Route exact path="/invoice" element={<Invoice />} />
      <Route exact path="/purchase" element={<Purchase />} />
      <Route exact path="/create-sale" element={<CreateSale />} />
      <Route exact path="/profit-loss" element={<ProfitLoss />} />
      <Route exact path="/update-company" element={<UpdateCompamny />} /> */}
    </Routes>
  );
};

export default Content;
