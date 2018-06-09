import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  	state = {
  		fishes: {},
  		order: {}
  	};

    static propTypes = {
      match: PropTypes.object.isRequired
    };

  	componentDidMount() {
      const { params } = this.props.match;
      // first reinstate our localStorage
      const localStorageRef = localStorage.getItem(params.storeId);
      if (localStorageRef) {
        this.setState({ order: JSON.parse(localStorageRef) });
      }

      this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: "fishes"
      });
    }

    componentDidUpdate() {
      localStorage.setItem(
        this.props.match.params.storeId,
        JSON.stringify(this.state.order)
      );
    }

    componentWillUnmount() {
      base.removeBinding(this.ref);
    }


  	addFish = fish => {
  		//take a copy of the existing state
  		const fishes = {...this.state.fishes};
  		//add the new fish
  		fishes[`fish${Date.now()}`] = fish;
  		//set the new fishes object to state
  		this.setState({
  			fishes: fishes
  		});
  	};

  	loadSamples = () => {
  		this.setState({fishes: sampleFishes});
  	};

  	addToOrder = (key) => {
  		const order = {...this.state.order};
  		order[key] = order[key] + 1 || 1;
  		this.setState({order});
  	};

  	removeFromOrder = (key) => {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order });
	};

	updateFish = (key, updatedFish) => {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({fishes});
	};

	deleteFish = (key) => {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	} 

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
          	{Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
        	order={this.state.order} 
        	fishes={this.state.fishes} 
        	removeFromOrder={this.removeFromOrder} 
        />
        <Inventory 
        	addFish={this.addFish}
        	updateFish={this.updateFish}
        	deleteFish={this.deleteFish}
        	loadSamples={this.loadSamples}
        	fish={this.state.fishes} 
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
