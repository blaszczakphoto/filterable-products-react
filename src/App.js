import React from 'react';
import logo from './logo.svg';
import './App.css';

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input 
          type="text" 
          placeholder="Search..." 
          value={this.props.filterText} 
          onChange={this.props.onFilterTextChangeCallback}/>
        <p>
          <input 
            type="checkbox" 
            checked={this.props.isStockOnly}
            onChange={this.props.onIsStockOnlyChangeCallback}/>
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      isStockOnly: false,
    };
    this.onFilterTextChangeCallback = this.onFilterTextChangeCallback.bind(this)
    this.onIsStockOnlyChangeCallback = this.onIsStockOnlyChangeCallback.bind(this)
  }

  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText} 
          isStockOnly={this.state.isStockOnly} 
          onFilterTextChangeCallback={this.onFilterTextChangeCallback}
          onIsStockOnlyChangeCallback={this.onIsStockOnlyChangeCallback}/>
        <ProductTable 
          products={this.props.products} 
          filterText={this.state.filterText} 
          inStockOnly={this.state.isStockOnly}  />
      </div>
    );
  }

  onFilterTextChangeCallback(e) {
    const enteredText = e.currentTarget.value;
    this.setState({filterText: enteredText});
  }

  onIsStockOnlyChangeCallback(e) {
    const value = e.currentTarget.checked;
    this.setState({isStockOnly: value});
  }
}

 

export default FilterableProductTable;
