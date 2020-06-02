import React, {Component} from 'react';
import AppNav from "./Home";
import {Button, Container} from "reactstrap";
import {MDBDataTable} from "mdbreact";

class Gemini extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      items: [{}]
    };

  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/expense/3');
      const body = await response.json();
      this.setState({isloading:false});

      body.map(expense=>
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


      if (!response.ok) {
        throw Error(response.statusText);
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

  render() {
    const title = <h3> 139 Gemini Cres Expenses</h3>;
    const {isloading,items} = this.state;

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

export default Gemini;
