import React, {Component} from 'react';
import AppNav from './AppNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Container,Input,Button,Label,Form,FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import { MDBDataTable} from 'mdbreact';
//import Moment from "react-moment";

class Expense extends Component {

  emptyItem={
    date:'',
    item:'',
    itemNumber:'',
    store:'',
    amount:'',
    category:[],
    location:[]

  };
  constructor(props){
    super(props);
    this.state={
      isloading:true,
      categories : [],
      locations: [],
      expenses:[],
      items:[{}],
      hasDate: false,
      hasCategory: false,
      hasLocation: false,
      hasAmount: false,
      item:this.emptyItem

    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handletxtChange=this.handletxtChange.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleSelectChange=this.handleSelectChange.bind(this);
    this.handleSelectChange2=this.handleSelectChange2.bind(this);
    this.remove=this.remove.bind(this);
  }

  async componentDidMount() {
    try {
      const rescategories = await fetch('/api/categories');
      const reslocations = await fetch('/api/locations');
      const resexpenses = await fetch('/api/expenses');
      const bodycategories = await rescategories.json();
      const bodylocations = await reslocations.json();
      const bodyexpenses = await resexpenses.json();

      this.setState({isloading:false, categories:bodycategories, locations:bodylocations, expenses:bodyexpenses});

      bodyexpenses.map(expense=>
          this.setState({items:this.state.items.concat({
              id:expense.id,
              itemNumber:expense.itemNumber,
              item:expense.item,
              category:expense.category.name,
              location:expense.location.address,
              //date: <Moment date={expense.date} format="YYYY/MM/DD" />,
              date:expense.date,
              store: expense.store,
              amount: expense.amount,
              action:<Button size="sm" color="danger" onClick={()=>this.remove(expense.id)}>Delete</Button>

            })}));


      if (!rescategories.ok) {
        throw Error(rescategories.statusText);
      }
      if (!reslocations.ok) {
        throw Error(reslocations.statusText);
      }
      if (!resexpenses.ok) {
        throw Error(resexpenses.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async remove(id){
    await fetch(`/api/expense/${id}`,{
      method:'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    }).then((response) =>{

      if (response.status !== 200) {
        throw new Error("Bad response from server");
      }
      return response;

    }).then(()=> {
      let updateditems = [...this.state.items].filter(i=>i.id!==id);
      this.setState({items:updateditems});
    }).catch((error) => {
      console.log(error)
    });
  }


  async handleSubmit(event){
    const {item} = this.state;

    event.preventDefault();

    if(!item.amount){
      this.setState({hasAmount: true});
    }
    else if (isNaN(item.amount)){
      this.setState({hasAmount: true});
    }
    else if(item.category.length === 0){
      this.setState({hasCategory: true});
    }
    else if(item.location.length === 0){
      this.setState({hasLocation: true});
    }
    else if(!item.date){
      this.setState({hasDate: true});
    }

    else {
      await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then((response) => {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response;

      }).catch((error) => {
        console.log(error)
      });

      //this.props.history.push("/expenses");
      this.setState({hasAmount: false, hasCategory:false,
        hasLocation:false, hasDate:false});
      window.location.reload(false);
    }

  }


  handletxtChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = {...this.state.item};
    item[name]= value;
    this.setState({item:item});
  }

  handleSelectChange(event){
    const target = event.target;
    const value = target.value;

    const selectedIndex = target.options.selectedIndex;
    const id =target.options[selectedIndex].getAttribute('data-key');

    let item = {...this.state.item};

    if(value !== 'select'){
      item['category']= {id:id,name:value};
      this.setState({item:item,hasCategory:false});
    }
    else {
      this.setState({hasCategory: true});
    }
  }

  handleSelectChange2(event){
    const target = event.target;
    const value = target.value;

    const selectedIndex = target.options.selectedIndex;
    const id =target.options[selectedIndex].getAttribute('data-key');

    let item = {...this.state.item};

    if(value !== 'select'){
      item['location']= {id:id,address:value};
      this.setState({item:item,hasLocation:false});
    }
    else {
      this.setState({hasLocation: true});
    }
  }


  handleDateChange(date){
    let item = {...this.state.item};
    item.date = date;

    this.setState({ item:item});
  };





  render() {
    const title = <h3> Add Expense</h3>;
    const {isloading,categories,locations,items,hasLocation,hasCategory,hasAmount,hasDate} = this.state;

    let optionList = categories.map(
          category =>
              <option key={category.id} data-key={category.id} value={category.name}>
                {category.name}
              </option>
      );

    let optionList2 = locations.map(
        location =>
            <option key={location.id} data-key={location.id} value={location.address}>
              {location.address}
            </option>
    );

    // let rows = expenses.map(
    //     expense =>
    //         <tr>
    //           <td>{expense.itemNumber}</td>
    //           <td>{expense.item}</td>
    //           <td>{expense.category.name}</td>
    //           <td>{expense.date}</td>
    //           <td>{expense.store}</td>
    //           <td>${expense.amount}</td>
    //           <td><Button size="sm" color="danger" onClick={()=>this.remove(expense.id)}>Delete</Button></td>
    //         </tr>
    // );


    let data = {
      columns: [
        {
          label: 'Item Number',
          field: 'itemNumber',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Item',
          field: 'item',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Date of Payment',
          field: 'date',
          sort: 'desc',
          width: 100
        },
        {
          label: 'Store',
          field: 'store',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Amount$',
          field: 'amount',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Location',
          field: 'location',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 100
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
                <Label for="itemno">Item Number</Label>
                <Input type="text" name="itemNumber" id="itemno" onChange={this.handletxtChange} />
              </FormGroup>

              <FormGroup className="col-md-3 mb-3">
                <Label for="item">Item</Label>
                <Input type="text" name="item" id="item" onChange={this.handletxtChange} />
              </FormGroup>

              <FormGroup className="col-md-2 mb-3">
                {hasAmount && <div
                    className="alert alert-warning">Amount must be a number and not Empty </div>}
                <Label for="amount">Amount</Label>
                <Input type="text" name="amount" id="amount" onChange={this.handletxtChange} />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                {hasCategory && <div
                    className="alert alert-warning">Must have a category </div>}
                <Label for="category">Category</Label>{'     '}
                <select onChange={this.handleSelectChange}>
                  <option value="select">Select</option>
                  {optionList}
                </select>
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                {hasLocation && <div
                    className="alert alert-warning">Must have a location </div>}
                <Label for="category">Location</Label>{'     '}
                <select onChange={this.handleSelectChange2}>
                  <option value="select">Select</option>
                  {optionList2}
                </select>
              </FormGroup>

              <FormGroup className="col-md-4 mb-1">
                {hasDate && <div
                    className="alert alert-warning">Must have a date </div>}
                <Label for="date">Date</Label>
                {'     '}
                <DatePicker
                    selected={this.state.item.date}
                    onChange={this.handleDateChange}
                />
              </FormGroup>

              <FormGroup className="col-md-2 mb-3">
                <Label for="store">Store</Label>
                <Input type="text" name="store" id="store" onChange={this.handletxtChange} />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <Button color="primary" type="submit">Save</Button>{'     '}
                <Button color="secondary" tag={Link} to="/">Cancel</Button>
              </FormGroup>

            </Form>

          </Container>

          <Container>
            <h3>Expense List</h3>
            {/*<Table className="mt-4">*/}
              {/*<thead>*/}
              {/*<tbody>*/}
                {/*<tr>*/}
                  {/*<th width="20%">Item Number</th>*/}
                  {/*<th width="20%">Item</th>*/}
                  {/*<th width="20%">Category</th>*/}
                  {/*<th width="20%">Date of Payment</th>*/}
                  {/*<th width="20%">Store</th>*/}
                  {/*<th width="10%">Amount</th>*/}
                  {/*<th width="10%">Action</th>*/}
                {/*</tr>*/}


                {/*{rows}*/}
              {/*</tbody>*/}

              {/*</thead>*/}

            {/*</Table>*/}

            <MDBDataTable
                striped
                bordered
                small
                order={['date', 'desc' ]}
                data={data}
            />

          </Container>

        </div>
    );
  }
}

export default Expense;
