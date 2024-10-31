import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { Link, useLocation } from 'react-router-dom';
import './Theloai.css'

function Theloai() {
    const location = useLocation();
    const [listMovieType, setListMovieType] = useState([]);
    const [listTheLoai, setListTheLoai] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const responseListMovieType = await axios.get("http://localhost:9999/phim");

            const urlParams = new URLSearchParams(window.location.search);
            const theloaiID = urlParams.get('id');

            setListMovieType(responseListMovieType.data.filter(m => m.theLoai.includes(parseInt(theloaiID))))

            const responseListTheloai = await axios.get("http://localhost:9999/theLoai");
            setListTheLoai(responseListTheloai.data)
        }
        fetchData();

        
    }, [location])





    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Carousel
                        responsive={responsive}
                        autoPlay={true}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        partialVisible={false}
                        ssr={true}
                    >
                        {
                            listMovieType.map(m => (
                                <img style={{ width: '100%' }} src={m.thumb_url}></img>
                            ))
                        }

                    </Carousel>

                </Col>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col><h4>Tất cả phim</h4></Col>
            </Row>

            <Row>
                {
                    listMovieType.map(m => (
                        <Col className='mt-5 backgroundMovie' xs={3}>
                            <Link to={`/xemphim/${m.id}`}>
                                <div>
                                    <img style={{ width: '250px' }} src={m.anhBia}></img>
                                    <div>
                                        <h6>{m.tieuDe}</h6>
                                        <h6>Thời lượng: {m.thoiLuong}</h6>
                                        <h6>Thể loại: {
                                            listTheLoai.filter(t => (m.theLoai.includes(parseInt(t.id)))).map(t => (t.ten)).join(', ')
                                        }
                                        </h6>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))
                }
            </Row>

        </Container>
    )
}

export default Theloai


