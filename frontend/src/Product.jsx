import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);

  const [searchName, SetSearchName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (ids) => {
    const found = products.find((u) => u.id == ids);
    const result = await axios.get(
      `http://127.0.0.1:8000/api/products/${found.id}/show`
    );

    console.log(result);
    setId("");
    setName(result.data.name);
    setDescription(result.data.description);
    setPrice(result.data.price);
    setImage(result.data.image);
    setCategory(result.data.category);
    Load();

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/products");
    setProducts(result.data.data.products);
  }

  async function DeleteProduct(id) {
    await axios.delete("http://127.0.0.1:8000/api/products/delete/" + id);
    alert("Product deleted Successfully");
    Load();
  }

  // search implementation

  const searchByTitle = async ({ name }) => {
    const searchParams = new URLSearchParams({
      name,
    });

    console.log(searchParams.getAll(name));

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/products?${searchParams}`
    );

    return data;
  };

  const handleSearch = () => {
    searchByTitle({ name: searchName })
      .then(({ data }) => {
        console.log(data.products);
        setProducts(data.products);
      })
      .catch((error) => {
        console.log(error, "message");
      });
  };

  const setSearch = (target) => {
    SetSearchName(target);
    setSearchParams({ name: target });
  };

  return (
    <div>
      <h1>Product Details</h1>

      <input
        type="search"
        id="searchProducts"
        placeholder="search by name"
        style={{ width: "200px", height: "30px", borderRadius: "10px" }}
        value={searchName}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        style={{ marginLeft: "10px", borderRadius: "10px" }}
        onClick={handleSearch}
      >
        Search
      </button>
      <table className="table" align="center">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {products.map((product) => {
          return (
            <tbody key={product.id}>
              <tr>
                <td>{product.name}</td>
                <td>
                  {product.description.length > 30
                    ? product.description.slice(0, 30).concat("...")
                    : product.description}
                </td>
                <td>{product.price}</td>
                <td>
                  <img
                    style={{ width: "100px" }}
                    src={product.image}
                    alt={product.image}
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  <Button type="primary" onClick={() => showModal(product.id)}>
                    View
                  </Button>
                  <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>Name: {name}</p>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>
                      Image:
                      <img style={{ width: "80px" }} src={image} alt={image} />
                    </p>
                    <p>Category: {category}</p>
                  </Modal>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteProduct(product.id)}
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

export default Product;
