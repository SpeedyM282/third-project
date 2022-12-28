import React, { Component } from "react";
import Cat from "../Cat";

class List extends Component {
  componentDidMount() {
    const component = this;
    setInterval(() => {
      component.props.hungerTimeUpdate();
    }, 1000)
  }
  generateCats = () => {
    return this.props.cats.map(cat => (
      <Cat
        cats={this.props.cats}
        setter={this.props.setter}
        heading={this.props.heading}
        key={cat.id}
        name={cat.name}
        color={cat.color}
        collar={cat.hasCollar}
        age={cat.age}
        isHungry={cat.isHungry}
        id={cat.id}
      />
    ))
  }

  render() {
    return (
      <div
        className="m-auto p-7 w-5/12 border border-black border-solid rounded-md flex flex-col items-center"
      >
        <h1 className="font-bold text-3xl" >{this.props.heading}</h1>
        {this.generateCats()}
      </div>
    );
  }
}

export default List;