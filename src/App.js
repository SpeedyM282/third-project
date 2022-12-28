import React, { Component } from "react";
import { nanoid } from "nanoid";
import { getName, getColor, getAge } from "./utils";
import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      neighbourCats: [],
    }
    this.update = this.update.bind(this)
  }

  update(nextState) {
    this.setState(nextState)
  }

  createCat = () => {
    const newCat = {
      name: getName(),
      color: getColor(),
      age: getAge(),
      id: nanoid(),
      hasCollar: Math.random() >= 0.5,
      isHungry: false,
      hungerTime: new Date().getTime() + 30000,
    }

    if (newCat.hasCollar) {
      this.setState({ ...this.state, neighbourCats: [...this.state.neighbourCats, newCat] })
    } else {
      this.setState({ ...this.state, cats: [...this.state.cats, newCat] })
    }
  }

  updateHungerTime = () => {
    const currentTime = new Date().getTime();

    const myCats = this.state.cats.map(cat => {
      if (currentTime >= (cat.hungerTime)) {
        cat.isHungry = true;
      }
      return cat;
    }).filter(cat => {
      const latestTimeToFeed = cat.hungerTime + 5000;
      return currentTime < latestTimeToFeed
    });

    const neighboursCats = this.state.neighbourCats.map(cat => {
      if (currentTime >= (cat.hungerTime)) {
        cat.isHungry = true;
      }
      return cat;
    }).filter(cat => {
      const latestTimeToFeed = cat.hungerTime + 5000;
      return currentTime < latestTimeToFeed
    });

    this.setState({
      ...this.state,
      cats: myCats,
      neighbourCats: neighboursCats,
    });
  }

  componentDidMount() {
    const component = this;
    setInterval(function () {
      component.createCat();
    }, 5000);
  }

  render() {
    return (
      <div className="flex">
        <List cats={this.state.cats} setter={this.update} hungerTimeUpdate={this.updateHungerTime} heading="First List" />
        <List cats={this.state.neighbourCats} setter={this.update} hungerTimeUpdate={this.updateHungerTime} heading="Neighbor's List" />
      </div>
    );
  }
}

export default App;
