import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function Body() {
    const [listMovie, setListMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const responseMovies = await axios.get("http://localhost:9999/phim");
            setListMovie(responseMovies.data);

            console.log(listMovie)

        }
        fetchData();

    }, [])

    return (
        <Container style={{}}>
            <Row>
                <Col>
                    <Row>
                        <Carousel>
                            {
                                listMovie.map((m, index) => (
                                    <Carousel.Item key={index}>
                                        <img style={{ width: "100%" }} src={m.thumb_url} alt={`Slide ${index}`} />
                                        <Carousel.Caption>
                                            <Row className='text-start'>
                                                <h2>{m.tieuDe}</h2>
                                                <h5>Thời lượng: {m.thoiLuong}phút</h5>
                                                <h5>Ngày phát hành: {new Date(m.ngayPhatHanh).toLocaleDateString('vi-VN')}</h5>
                                                <Col className='mt-2 pt-3' style={{ display: "flex", alignItems: 'center' }}>
                                                    <Link to={`xemphim/${m.id}`}>
                                                        <Button style={{ width: '150px', height: '40px' }} className='button me-2'>
                                                            <FontAwesomeIcon icon={faPlay} /> Xem Ngay
                                                        </Button>
                                                    </Link>
                                                    <FontAwesomeIcon className='up' style={{ fontSize: '30px' }} icon={faHeart} />
                                                </Col>
                                            </Row>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Body
