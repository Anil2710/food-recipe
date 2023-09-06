import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../../app/shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private store: Store<fromApp.AppState>) {}

    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'Rajasthani Pakoda Kadhi', 
    //       'The highlight of the Rajasthani Pakoda Kadhi is the addition of crisp and fresh besan pakodas! This imparts a chewy, crunchy dimension to the kadhi making it more satiating.', 
    //       '../../assets/Images/big_rajasthani_pakoda_kadhi-11898.jpg',
    //       [
    //         new Ingredient('besan', 1),
    //         new Ingredient('chopped corainder', 2),
    //         new Ingredient('curd', 2),
    //       ]),
    //     new Recipe(
    //       'Dal baati churma', 
    //       'This is the state classic signature dish. Baati is hard, unleavened bread cooked in the desert areas of Rajasthan. Baati is prized mainly for its long shelf life, plus it requires hardly any water for its preparation. It is always eaten with dal (lentil curry).', 
    //       '../../assets/Images/daal.jpeg',
    //       [
    //         new Ingredient('wheat flour', 1),
    //         new Ingredient('Chana daal', 1),
    //         new Ingredient('turmeric powder', 1)
    //       ])
    //   ];

    private  recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
       return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
   }

    sendIngredientsToShoppingList(ingredients: Ingredient[]) {
      // this.slService.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:  number) {
      this.recipes.slice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }

}