import React, { Component } from 'react';
import axios from 'axios';
import FavRecipes from './FavRecipes';
import UpdateForm from './UpdateForm';

class FavoriteRecipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: process.env.REACT_APP_SERVER,
            recipes: [],
            showRecipes: false,
            showForm: false,
            image: '',
            label: '',
            ingredientLines: '',
            index: ''
        }
    }

    componentDidMount = async () => {
        const favData = await axios.get(`${this.state.server}/getFavData`);
        this.setState({
            recipes: favData.data,
            showRecipes: true
        })
    }

    deleteRecipe = async (idx) => {
        const id = this.state.recipes[idx]._id;
        const newRecipes = await axios.delete(`${this.state.server}/deleteRecipes/${id}`);
        this.setState({
            recipes: newRecipes.data
        })
    }

    showUpdateForm = (idx) => {
        const chosenRecipe = this.state.recipes[idx];
        this.setState({
            showForm: true,
            image: chosenRecipe.image,
            label: chosenRecipe.label,
            ingredientLines: chosenRecipe.ingredientLines,
            index: idx,
        })
    }

    updateImage = (e=>this.setState({image:e.target.value}));
    updateLabel = (e=>this.setState({label:e.target.value}));
    updateIngredeant = (e=>this.setState({ingredientLines:e.target.value}));

    updateRecipe=async(event)=>{
        event.preventDefault();

        const id = this.state.recipes[this.state.index]._id;
        const recipeObj ={
            image:this.state.image,
            label: this.state.label,
            ingredientLines:this.state.ingredientLines,
        }
        const updateData = await axios.put(`${this.state.server}/updateRecipes/${id}`,recipeObj);
        this.setState({
            recipes:updateData.data
        })
    }

    render() {
        return (
            <>

                {this.state.showForm &&
                    <UpdateForm
                        image={this.state.image}
                        label={this.state.label}
                        ingredientLines={this.state.ingredientLines}
                        updateImage={this.updateImage}
                        updateLabel={this.updateLabel}
                        updateIngredeant={this.updateIngredeant}
                        updateRecipe={this.updateRecipe}
                    />
                }

                {this.state.showRecipes &&
                    this.state.recipes.map((recipes, idx) => {
                        return (
                            <FavRecipes
                                recipes={recipes}
                                idx={idx}
                                deleteRecipe={this.deleteRecipe}
                                showUpdateForm={this.showUpdateForm}
                            />
                        )
                    })}
            </>
        )
    }
}

export default FavoriteRecipes
