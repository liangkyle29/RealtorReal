import React, {Component} from 'react';
import AppNav from './AppNav';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {MDBDataTable} from "mdbreact";

class Category extends Component {
  emptyItem={
    name:''
  };
  constructor(props){
    super(props);
    this.state = {
      isloading: true,
      categories: [],
      item: this.emptyItem,
      items: [{}]
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handletxtChange=this.handletxtChange.bind(this);
    this.remove=this.remove.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/categories');
      const body = await response.json();
      this.setState({isloading:false, categories:body});

      body.map(category=>
          this.setState({items:this.state.items.concat({
              id:category.id,
              name:category.name,
              action:<Button size="sm" color="danger" onClick={()=>this.remove(category.id)}>Delete</Button>

            })}));


      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id){

    await fetch(`/api/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
          if (response.status !== 200) {
            alert("This category exists in at least ONE expense!");
            throw new Error("Bad response from server");
          }
          return response;

      }).then(() => {
        let updateditems = [...this.state.items].filter(i => i.id !== id);
        this.setState({items: updateditems});
      }).catch((error) => {
        console.log(error)
    });
  }

  async handleSubmit(event){

    const {item} = this.state;

    event.preventDefault();
    await fetch('/api/category',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)

    }).then((response) =>{
      if (response.status !== 200) {
        throw new Error("Bad response from server");
      }
      return response;


    }).catch((error) => {
      console.log(error)
    });



    window.location.reload(false);
  }

  handletxtChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = {...this.state.item};
    item[name]= value;
    this.setState({item:item});
  }

  render() {

    const{isloading,items} = this.state;
    const title = <h3> Add Categories</h3>;

    let data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 10
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 10
        }
      ],
      rows:items
    };

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
                <Label for="name">Category Name</Label>
                <Input type="text" name="name" id="name" onChange={this.handletxtChange} />
              </FormGroup>


              <FormGroup className="col-md-4 mb-3">
                <Button color="primary" type="submit">Save</Button>{'     '}
                <Button color="secondary" tag={Link} to="/">Cancel</Button>
              </FormGroup>

            </Form>

          </Container>

          <Container>
            <h3>Category List</h3>

            <MDBDataTable
                bordered
                small
                data={data}
            />

          </Container>

        </div>
    );
  }
}


export default Category;

