import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap/';

class Recipes extends Component {
    render() {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.recipes.image} />
                    <Card.Body>
                        <Card.Title>{this.props.recipes.label}</Card.Title>
                        <Card.Text>{this.props.recipes.ingredientLines}</Card.Text>
                        <Button onClick={()=>this.props.addToFav(this.props.recipes)} variant="primary">Add To Fav</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Recipes;
