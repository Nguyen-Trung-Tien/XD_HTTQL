import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-card shadow-card flex flex-col h-full overflow-y-auto">
          <Sidebar />
        </div>


        <div className="flex-1 overflow-auto bg-blue-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
