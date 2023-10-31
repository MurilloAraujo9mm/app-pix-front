import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/views/DashBoard/Componentes/Login/Login';
import DashboardLayout from './componentes/views/DashBoard/Componentes';
import Transaction from './componentes/views/DashBoard/Componentes/Transaction';
import BalanceTransaction from './componentes/views/DashBoard/Componentes/Balance';
import MyAccount from './componentes/views/DashBoard/Componentes/MyAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="transaction" element={<Transaction />} />
          <Route path="balance/transaction" element={<BalanceTransaction />} />
          <Route path="balance/my-account" element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
