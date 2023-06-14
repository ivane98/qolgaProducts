import axios from "axios";
import { useEffect, useState } from "react";

function AddCategory() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/categories");
    setCategories(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/categories/save", {
        name: name,
      });
      alert("Products Registation Successfully");
      setId("");
      setName("");
      Load();
    } catch (err) {
      alert("Product Registation Failed");
    }
  }

  return (
    <div>
      <h1>Category Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="category_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Category Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="categoryName"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
