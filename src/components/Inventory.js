import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login'; 


class Inventory extends React.Component {
	static propTypes = {
		fish: PropTypes.object.isRequired,
		updateFish: PropTypes.func.isRequired, 
		deleteFish: PropTypes.func.isRequired,
		addFish: PropTypes.func.isRequired,
		loadSamples: PropTypes.func.isRequired 
	};

	state = {
	    uid: null,
	    owner: null
  	};

  	componentDidMount() {
	    firebase.auth().onAuthStateChanged(user => {
	      if (user) {
	        this.authHandler({ user });
	      }
	    });
  	}

  	authHandler = async authData => {
	    const store = await base.fetch(this.props.storeId, { context: this });
	    console.log(store);
	    // claim it 
	    if (!store.owner) {
	      // save it as our own
	      await base.post(`${this.props.storeId}/owner`, {
	        data: authData.user.uid
	     	});
    	}
    
    	this.setState({
	    	uid: authData.user.uid,
	    	owner: store.owner || authData.user.uid
    	});
  	};

	authenticate = provider => {
	    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
	    firebaseApp
	      .auth()
	      .signInWithPopup(authProvider)
	      .then(this.authHandler);
	};

	logout = async () => {
	    await firebase.auth().signOut();
	    this.setState({ uid: null });
	};

  render() {
  	const logout = <button class="logout" onClick={this.logout}>Log Out!</button>;

    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    return (
	    <div className="inventory">
	    	<h2>Inventory</h2>
			{logout}
	    	{Object.keys(this.props.fish).map(key => (
	    		<EditFishForm 
	    			key={key}
	    			index={key}
	    			fish={this.props.fish[key]} 
	    			updateFish={this.props.updateFish}
	    			deleteFish={this.props.deleteFish}
	    		/>
	    	))}
	    	<AddFishForm addFish={this.props.addFish} />
	    	<button onClick={this.props.loadSamples}> Load Sample Fishes</button>
	    </div>
    );
  }
}

export default Inventory;
