import React, {Component} from 'react';
import AppNav from './AppNav';
import {Button, Container} from "reactstrap";

class Home extends Component {

  render() {
    return (
        <div>
          <AppNav />
          <Container>
                 <Button color="primary" type="submit" href="/gemini/">139 Gemini Cres</Button>
                {'  '}
                 <Button color="primary" type="submit" href="/ocean/">39 Ocean View</Button>
                {'  '}
                 <Button color="primary" type="submit" href="/blue/">382 Blue Grass</Button>
          </Container>
        </div>

    );
  }
}

export default Home;
