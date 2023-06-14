import axios from "axios";
import { useEffect, useState } from "react";

function AddProduct() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(result.data);
      console.log(result.data);
    };

    fetchCategory();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/products");
    setProducts(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/products/save", {
        name: name,
        description: description,
        price: price,
        image: image,
        category: category,
      });
      alert("Products added Successfully");
      setId("");
      setName("");
      setDescription("");
      setPrice(0);
      setImage("");
      setCategory("");
      Load();
    } catch (err) {
      alert("Product not added, please fill all fields");
    }
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="product_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Product Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="productName"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Product description</label>
            <input
              required
              type="text"
              className="form-control"
              id="productDescription"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              required
              type="number"
              className="form-control"
              id="productPrice"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              required
              type="text"
              className="form-control"
              id="productImage"
              value={image}
              onChange={(event) => {
                setImage(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              required
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              {categories?.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
