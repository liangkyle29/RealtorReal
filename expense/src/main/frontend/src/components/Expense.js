import React, {Component} from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Container,Input,Button,Label,Form,FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';


class Expense extends Component {

  state = {
    date:new Date(),
    isloading:true,
    categories : [],
    expenses:[]
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };


  async componentDidMount() {
    try {
      const rescategories = await fetch('/api/categories');
      const resexpenses = await fetch('/api/categories');
      const bodycategories = await rescategories.json();
      const bodyexpenses = await resexpenses.json();

      this.setState({isloading:false, categories:bodycategories, expenses:bodyexpenses});

      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const title = <h3> Add Expenses</h3>;
    const {expenses,isloading,categories} = this.state;

    let optionList = categories.map(
          category =>
              <option id={category.id}>
                {category.name}
              </option>
      );

    if(isloading){
      return(
          <div>
            <AppNav />
            Loading ...
          </div>)
    }

    return (
        <div>
          <AppNav />
          <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="col-md-4 mb-3">
                <Label for="item">Item</Label>
                <Input type="text" name="item" id="item" onChange={this.handletxtChange} autoComplete="name" />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <Label for="category">Category</Label>
                <select>
                  {optionList}
                </select>
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <Label for="date">Date</Label>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <Button color="primary" type="submit">Save</Button>
                <Button color="secondary" tag={Link} to="/">Cancel</Button>
              </FormGroup>

            </Form>

          </Container>
        </div>
    );
  }
}

export default Expense;
