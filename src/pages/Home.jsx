import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import axios from "axios";

function Home() {

  // SEARCH
  const [searchKey, setSearchKey] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  function filterProducts(searchKey) {
    const filtered = data.filter(product =>
      product.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredData(filtered);
  }

  useEffect(() => {
    filterProducts(searchKey);
  }, [searchKey]);

  const [data, setData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data)
      } catch (err) {
        console.log(err);
      }
    }

    fetchData()

  }, [])

  useEffect(() => {

  })

  return (
    <>

      <div style={{ marginTop: '100px' }} className='d-flex justify-content-center align-items-center w-100'>
        <div className='d-flex align-items-center justify-content-between w-50 border  rounded p-2'>
          <input style={{ border: 'none', outline: 'none' }} className='form-control fs-5' type="text" placeholder='search product' value={searchKey} onChange={e => setSearchKey(e.target.value)} />
          <i style={{ marginLeft: '-50px' }} class="fa-solid fa-magnifying-glass fs-5 me-3"></i>
        </div>
      </div>

      {
        searchKey ?
          <Row className="ms-5 mt-5">
            {
              //conditional rendering
              filteredData?.length > 0 ? (
                filteredData?.map((product, index) => (
                  <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
                    <Card className="shadow rounded p-3" style={{ width: "20rem", height: "29rem" }}>
                      <Card.Img height={'200px'} variant="top" src={product?.image} />
                      <Card.Body style={{ overflowY: 'hidden' }}>
                        <Card.Title>{product?.title.slice(0, 30)}...</Card.Title>
                        <Card.Text>
                          <p>{product?.description.slice(0, 50)}...</p>
                          <h5>$ {product?.price}</h5>
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button className="btn btn-light">
                            <i className="fa-solid fa-heart text-danger me-2 fa-2x" onClick={() => dispatch(addToWishlist(product))}></i>
                          </Button>
                          <Button className="btn btn-light">
                            <i className="fa-solid fa-cart-shopping text-success me-2 fa-2x" onClick={() => dispatch(addToCart(product))}></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-danger text-center fw-bold fs-4">Nothing to Display</p>
              )
            }
          </Row>
          :
          <Row className="ms-5 mt-5">
            {
              //conditional rendering
              data?.length > 0 ? (
                data?.map((product, index) => (
                  <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
                    <Card className="shadow rounded p-3" style={{ width: "20rem", height: "29rem" }}>
                      <Card.Img height={'200px'} variant="top" src={product?.image} />
                      <Card.Body style={{ overflowY: 'hidden' }}>
                        <Card.Title>{product?.title.slice(0, 30)}...</Card.Title>
                        <Card.Text>
                          <p>{product?.description.slice(0, 50)}...</p>
                          <h5>$ {product?.price}</h5>
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button className="btn btn-light">
                            <i className="fa-solid fa-heart text-danger me-2 fa-2x" onClick={() => dispatch(addToWishlist(product))}></i>
                          </Button>
                          <Button className="btn btn-light">
                            <i className="fa-solid fa-cart-shopping text-success me-2 fa-2x" onClick={() => dispatch(addToCart(product))}></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-danger text-center fw-bold fs-4">Nothing to Display</p>
              )
            }
          </Row>
      }
    </>
  );
}

export default Home;
