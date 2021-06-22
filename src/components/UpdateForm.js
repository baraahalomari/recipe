import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap/';

class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={e=>this.props.updateRecipe(e)}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" value={this.props.image} onChange={this.props.updateImage}/>
                        
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.props.label} onChange={this.props.updateLabel} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Ingred</Form.Label>
                        <Form.Control type="text" value={this.props.ingredientLines} onChange={this.props.updateIngredeant} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default UpdateForm
