import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Movie.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [listDienVien, setListDienVien] = useState([])
    const [listTheLoai, setListTheLoai] = useState([])
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [listMovie, setListMovie] = useState([])
    const navigate = useNavigate();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        const fetchData = async () => {

            const responseMovie = await axios.get(`http://localhost:9999/phim/${id}`);
            setMovie(responseMovie.data);

            const responseListMovie = await axios.get(`http://localhost:9999/phim`);
            setListMovie(responseListMovie.data);

            const responseDienVien = await axios.get("http://localhost:9999/dienVien");
            setListDienVien(responseDienVien.data);

            const responseTheLoai = await axios.get("http://localhost:9999/theLoai");
            setListTheLoai(responseTheLoai.data);
        }
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])

    const navigateMovie = (movieId) => {
        //window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/xemphim/${movieId}`);
    }

    return (
        <Container>
            <Row className='infoMovie'>
                <Col style={{ marginTop: '60px' }} xs={3}>
                    <Row >
                        <Col>
                            <img style={{ width: '300px', height: '450px' }} src={movie.anhBia}></img>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='d-flex align-items-center'>
                            <Link to={movie.linkVideo}>
                                <Button style={{ width: '150px', height: '40px' }} className='button me-2'>
                                    <FontAwesomeIcon icon={faPlay} /> Xem Ngay
                                </Button>
                            </Link>
                            <FontAwesomeIcon className='up' style={{ fontSize: '30px' }} icon={faHeart} />
                        </Col>
                    </Row>
                </Col>
                <Col >
                    <Row className='text-center'>
                        <Col><h3>{movie.tieuDe}</h3></Col>
                    </Row>
                    <Row>
                        <Col className='movie'>
                            <hr></hr>
                            <span>
                                <h5>Tình trạng:</h5>
                                <span>Full</span>
                            </span>
                            <hr></hr>
                            <span >
                                <h5>Thời lượng: </h5>
                                <span>{movie.thoiLuong} phút</span>
                            </span>
                            <hr></hr>
                            <span>
                                <h5>Ngày phát hành: </h5>
                                <span>{new Date(movie.ngayPhatHanh).toLocaleDateString('vn-VN')}</span>
                            </span>
                            <hr></hr>
                            <span>
                                <h5>Chất lượng: </h5>
                                <span>FHD</span>
                            </span>
                            <hr></hr>
                            <span>
                                <h5>Ngôn ngữ: </h5>
                                <span>Vietsub</span>
                            </span>
                            <hr></hr>
                            <span>
                                <h5>Đạo diễn: </h5>
                                <span>{movie.daoDien}</span>
                            </span>
                            <hr></hr>
                            <span>
                                <h5>Diễn viên: </h5>
                                <span>
                                    {
                                        listDienVien.filter(d => movie.dienVien.includes(parseInt(d.id))).map(d => (d.ten)).join(', ')
                                    }
                                </span>

                            </span>
                            <hr></hr>
                            <span>
                                <h5>Thể loại: </h5>
                                <span>
                                    {
                                        listTheLoai.filter(t => movie.theLoai.includes(parseInt(t.id))).map(t => (t.ten)).join(', ')

                                    }
                                </span>
                            </span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mb-2 align-items-center'>
                <Col xs={1} style={{ backgroundColor: '#444', borderRadius: '8px', height: '50px', lineHeight: '50px' }}>
                    <FontAwesomeIcon style={{marginTop: '12px'}} className='starChoice' icon={solidStar} />
                    <span className='ms-2' style={{ fontSize: 'larger', fontWeight: '700' }}>
                        {
                            ((movie.danhGia / 10) * 4).toFixed(2)
                        }
                    </span>
                </Col>
                <Col className="star-rating">
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            className="star"
                            icon={solidStar}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                            style={{ color: hoverIndex >= index ? '#fe592a' : 'lightgray' }}
                        />
                    ))}
                </Col>
            </Row>
            <Row>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header >
                            Nội dung
                        </Accordion.Header>
                        <Accordion.Body >
                            {movie.moTa}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>

            <Row className='mt-2'>
                <Col className='ps-0'>
                    <h4>Nội dung liên quan</h4>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Carousel responsive={responsive}
                        autoPlay={true}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        partialVisible={false}
                        ssr={true}
                        dotListClass="custom-dot-list-style"
                    >
                        {listMovie.map(m => {
                            if (movie.theLoai.some(genre => m.theLoai.includes(genre))) {
                                return (
                                    <div className="slider" >
                                        <img onClick={() => navigateMovie(m.id)} style={{ width: "200px", height: "280px" }} src={m.anhBia} />
                                        <h6 className='mt-2'>{m.tieuDe}</h6>
                                        {/* <h6 >Thể loại:
                                            {
                                                listTheLoai.filter(t => m.theLoai.includes(parseInt(t.id))).map(t => (t.ten)).join(",")
                                            }
                                        </h6> */}
                                    </div>
                                )
                            }
                        })}
                    </Carousel>

                </Col>
            </Row>
        </Container>
    )
}

export default Movie
