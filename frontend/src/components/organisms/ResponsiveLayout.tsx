import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../molecules/Header';
import styled from 'styled-components';

type Props = {
    children: React.ReactNode;
};

const CustomContainer = styled(Container)`
    outline: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    margin-top: 2rem;
    background-color: white;
    `

const ResponsiveLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <CustomContainer>
                <Row>
                    <Col xs={12} md={10} lg={8} className="mx-auto">
                        {children}
                    </Col>
                </Row>
            </CustomContainer>
        </>
    );
};

export default ResponsiveLayout;
