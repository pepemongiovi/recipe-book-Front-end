import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../../core/models/ingredient.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RouterService} from '../../../core/services/router.service';
import {Recipe} from '../../../core/models/recipe.model';
import {RecipeService} from '../../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-registration',
  templateUrl: './recipe-registration.component.html',
  styleUrls: ['./recipe-registration.component.css']
})
export class RecipeRegistrationComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              private routerService: RouterService,
              private recipeService: RecipeService) {
    this.createForm();
  }

  ngOnInit() {}

  form: FormGroup;
  ingredients: Ingredient[] = [];

  addIngredient() {
    const fields = this.form.value;
    const newIngredient = new Ingredient(fields.newIngredientName, fields.newIngredientAmount, false);
    this.ingredients.push(newIngredient);
    this.clearNewIngredientInput();
  }

  clearNewIngredientInput() {
    this.form = this._formBuilder.group({
      name: [this.form.value.name, [Validators.required]],
      description: [this.form.value.description, [Validators.required]],
      imgPath: [this.form.value.imgPath],
      newIngredientName: [''],
      newIngredientAmount: [1]
    });
  }

  deleteIngredient(position){
    this.ingredients.splice(position, 1);
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imgPath: [''],
      newIngredientName: [''],
      newIngredientAmount: [1]
    });
  }
  submitDisabled() {
    return this.form.invalid || this.ingredients.length===0;
  }

  onSubmit() {
    const fields = this.form.value;
    const recipe = new Recipe(fields.name, fields.description, fields.imgPath, this.ingredients);
    this.recipeService.createRecipe(recipe);
  }

}
