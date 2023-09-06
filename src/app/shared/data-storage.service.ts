import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient, private recipe: RecipeService, private store: Store<fromApp.AppState>) {

    }

    storeRecipes() {
        const recipes = this.recipe.getRecipes();
        return this.http.put('https://food-recipe-152c8-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        })
    }

    FetchRecipes() {
            return this.http.get<Recipe[]>('https://food-recipe-152c8-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes => {
                // this.recipe.setRecipes(recipes);
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            })
        )
    }
}