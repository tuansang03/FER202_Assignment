import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const [listTheLoai, setListTheLoai] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const responseTheloai = await axios.get("http://localhost:9999/theLoai");
            setListTheLoai(responseTheloai.data);     
        }
        fetchData();

    }, [])

    return (
        <Container>
            <Row className='header'>
                <Col xs={8}>
                    <Row>
                        <Col>
                            <h5>Logo</h5>
                        </Col>
                        <Col >
                            <Link to={'/'}>
                                <h5>Trang chủ</h5>
                            </Link>
                        </Col>
                        <Col >
                            <Link>
                                <h5>Phim mới</h5>
                            </Link>
                        </Col>
                        <Col >
                            <Dropdown style={{ backgroundColor: 'black' }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <h5>Thể loại</h5>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        listTheLoai.map(t => (<Dropdown.Item href={`/theloai?id=${parseInt(t.id)}`} >{t.ten}</Dropdown.Item>))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col >
                            <h5>Xếp hạng phim</h5>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className='text-center'>
                        <Col xs={4}></Col>
                        <Col style={{ marginLeft: '50px' }}>
                            <h5><FontAwesomeIcon icon={faSearch} /></h5>
                        </Col>
                        <Col>
                            <h5><FontAwesomeIcon icon={faBell} /></h5>
                        </Col>
                        <Col xs={4}>
                            <h5>Đăng nhập</h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
