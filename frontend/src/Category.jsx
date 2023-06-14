import axios from "axios";
import { useEffect, useState } from "react";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/categories");
    setCategories(result.data);
  }

  async function DeleteCategory(id) {
    await axios.delete("http://127.0.0.1:8000/api/categories/delete/" + id);
    alert("Product deleted Successfully");
    Load();
  }

  return (
    <div>
      <h1>Category Details</h1>
      <table className="table" align="center">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        {categories.map(function fn(category) {
          return (
            <tbody key={category.id}>
              <tr>
                <td>{category.name}</td>
                <td style={{ width: "auto" }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Category;
