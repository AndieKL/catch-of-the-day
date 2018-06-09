import React from 'react'; 
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
	static propTypes = {
		addFish: PropTypes.func.isRequired
	};	

	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();


	createFish = (event) => {
		event.preventDefault();
		const fish = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value),
			status: this.statusRef.current.value,
			desc: this.descRef.current.value, 
			image:this.imageRef.current.value
		}
		this.props.addFish(fish);
		event.currentTarget.reset();
	};

	render() {
		return (
			<form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish}>
				<input name='name' ref={this.nameRef} type="text" placeholder="Fish Name" />
				<input name='price' ref={this.priceRef} type="text" placeholder="Fish Price" />
				<select name='status' ref={this.statusRef}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name='desc' ref={this.descRef} type="text" placeholder="Fish Desc"></textarea>
				<input name='image' ref={this.imageRef} type="text" placeholder="Fish Image" />
				<button type="submit">+ Add Item</button>
			</form>
		)
	}
}

export default AddFishForm;