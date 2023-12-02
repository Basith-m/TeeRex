import React from 'react'
import { Navbar,Nav,Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {

//   access data from store
  const wishlist = useSelector((state)=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)
  return (
    <>
        <Navbar expand="lg" style={{zIndex:'100'}} className='bg-primary position-fixed top-0 w-100 mb-5 z-1'>
        <Container>
            <Navbar.Brand><Link to={'/'} style={{textDecoration:'none',color:'white',fontWeight:'bold',fontSize:'25px'}}>TeeRex</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link className='btn border rounded'>
                    <Link to={'/wishlist'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
                        <i className='fa-solid fa-heart text-danger me-2'></i>Wishlist
                        <Badge className='ms-2 rounded bg-light'>{wishlist.length}</Badge>
                    </Link>
                </Nav.Link>
                <Nav.Link className='btn border rounded ms-3'>
                    <Link to={'/cart'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
                        <i className='fa-solid fa-cart-shopping text-warning me-2'></i>Cart
                        <Badge className='ms-2 rounded bg-light'>{cart.length}</Badge>
                    </Link>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  )
}

export default Header