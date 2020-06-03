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
                 <Button color="primary" type="submit" href="/gemini/">139 Gemini Cres</Button>
                {'  '}
                 <Button className="btn-info" type="submit" href="/ocean/">39 Ocean View</Button>
                {'  '}
                 <Button className="btn-success" type="submit" href="/blue/">382 Blue Grass</Button>
          </Container>
        </div>

    );
  }
}

export default Home;
