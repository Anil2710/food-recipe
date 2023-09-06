import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State  {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [new Ingredient('Apples', 3),new Ingredient('Tomatoes', 5)],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    // state: State = initialState;
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            // state.ingredients.push()
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const UpdatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const UpdatedIngredients = {
                ...state.ingredients
            };
            UpdatedIngredients[state.editedIngredientIndex] = UpdatedIngredient;
            return {
                ...state,
                ingredients: UpdatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                })
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]},
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}