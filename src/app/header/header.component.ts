import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({providedIn: 'root'})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  user: Subscription;
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.user = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user)
      console.log(!!user)
    })
  }

  onStoreData() {
    // this.dataStorage.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorage.FetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.user.unsubscribe();
  }

}
