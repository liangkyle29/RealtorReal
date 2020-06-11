import React, {Component} from 'react';
import AppNav from './AppNav';
import './Home.css';
import {Button, Container} from "reactstrap";

class Home extends Component {

  render() {
    return (
        <div>
          <AppNav />
          <Container className="con">
                 <Button color="primary" type="submit" href="/gemini/">G</Button>
                {'  '}
                 <Button className="btn-info" type="submit" href="/ocean/">O</Button>
                {'  '}
                 <Button className="btn-success" type="submit" href="/blue/">B</Button>
          </Container>
        </div>

    );
  }
}

export default Home;
