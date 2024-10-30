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

function Header() {
    return (
        <Container>
            <Row className='header'>
                <Col xs={8}>
                    <Row>
                        <Col>
                            <h5>Logo</h5>
                        </Col>
                        <Col >
                            <h5><Link to={'/'}>Trang chủ</Link></h5>
                        </Col>
                        <Col >
                            <h5>Phim mới</h5>
                        </Col>
                        <Col >
                            <h5>Thể loại</h5>
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
