import React, { Component } from 'react';
import axios from 'axios';
import Recipes from './Recipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap/';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: process.env.REACT_APP_SERVER,
            recipes: [],
            showRecipes: false,
            search:'',
        }
    }

    updateSearch=e=>this.setState({search:e.target.value});

    updateSubmit=async(event)=>{
        event.preventDefault();

        const recipesData = await axios.get(`${this.state.server}/recipes?q=${this.state.search}`);
        this.setState({
            recipes: recipesData.data,
            showRecipes: true
 
        })
    }

    // componentDidMount = async () => {
    //     const recipesData = await axios.get(`${this.state.server}/recipes?q=rice`);
    //     this.setState({
    //         recipes: recipesData.data,
    //         showRecipes: true
    //     })
    // }

    addToFav = async (recipeFav) => {
        await axios.post(`${this.state.server}/addToFav`, recipeFav)
    }

    render() {
        return (
            <>
            <div>
            <Form onSubmit={e=>this.updateSubmit(e)}>
                    <Form.Group className="mb-3" >
                       
                        <Form.Control type="text"  onChange={this.updateSearch}/>
                        
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

                {this.state.showRecipes &&
                    this.state.recipes.map((recipes, idx) => {
                        return (
                            <Recipes
                                recipes={recipes}
                                idx={idx}
                                addToFav={this.addToFav}
                            />
                        )


                    })}

            </>
        )
    }
}

export default Main
