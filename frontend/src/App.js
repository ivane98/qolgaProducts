import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/products">Products</Link>
        <Link to="/addProducts">Add Products</Link>
        <Link to="/category">Categories</Link>
        <Link to="/addCategory">Add Category</Link>
      </aside>
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
