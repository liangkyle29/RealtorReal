import React, {Component} from 'react';
import AppNav from './AppNav';

class Category extends Component {
  state = {
    isloading : true,
    categories : []
  };

  async componentDidMount() {
    try {
      const response = await fetch('/api/categories');
      const body = await response.json();
      this.setState({isloading:false, categories:body});

      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const{isloading,categories} = this.state;

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
          <h2>Categories</h2>
          {
            categories.map(
                category =>
                    <div id={category.id}>
                      {category.name}
                    </div>
            )
          }
        </div>
    );
  }
}


export default Category;

