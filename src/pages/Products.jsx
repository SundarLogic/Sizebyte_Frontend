import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  const limit = 6;

  useEffect(() => {
    getProducts({
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      order,
    })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, search, category, minPrice, maxPrice, sort, order]);

  return (
    <div>
      <div className="products-header">
        <h1>Explore Our Products</h1>
        <p>Explore our range of computer accessories and gadgets</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="category-bar">
        <button
          onClick={() => {
            setCategory("");
            setPage(1);
          }}
        >
          All
        </button>

        <button
          onClick={() => {
            setCategory("Mouse");
            setPage(1);
          }}
        >
          Mouse
        </button>

        <button
          onClick={() => {
            setCategory("Keyboard");
            setPage(1);
          }}
        >
          Keyboard
        </button>

        <button
          onClick={() => {
            setCategory("headphones");
            setPage(1);
          }}
        >
          Headphones
        </button>

        <button
          onClick={() => {
            setCategory("Monitor");
            setPage(1);
          }}
        >
          Monitor
        </button>
      </div>
      <div className="filter-row">
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(event) => {
              setMinPrice(event.target.value);
              setPage(1);
            }}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="sort-filter">
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          <select
            value={order}
            onChange={(event) => {
              setOrder(event.target.value);
              setPage(1);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
