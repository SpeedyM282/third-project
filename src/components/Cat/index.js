import React, { Component } from "react";


class Cat extends Component {
  clickHandle = () => {
    const newCats = this.props.cats.map(cat => {
      if (cat.id === this.props.id) {
        const currentTime = new Date().getTime();
        cat.isHungry = false;
        cat.hungerTime = currentTime + 30000;
      }
      return cat;
    })
    if (this.props.heading === 'First List') {
      this.props.setter({ ...this.props.cats, cats: newCats })
    } else {
      this.props.setter({ ...this.props.cats, neighbourCats: newCats })
    }
  }

  render() {
    return (
      <div
        className="w-80 h-8 m-4 border-b-2 flex justify-between"
      >
        <div className="flex flex-col">
          <p>{this.props.name}{this.props.collar && ' + Collar'}: {this.props.age}y.o.</p>
          <div className="w-10 h-2" style={{ background: this.props.color }}></div>
        </div>
        <div>
          {this.props.isHungry ? <button className='w-24 border' onClick={this.clickHandle}
          >Feed</button> : null}
        </div>
      </div>
    );
  }
}

export default Cat;