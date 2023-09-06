import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  closeSub: Subscription;
  private storeSub: Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {   
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  OnSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if(!form.valid) {
      return;
    }

    if(this.isLoginMode) {
      // authObs = this.auth.onLogin(form.value.email, form.value.password)
      this.store.dispatch(new AuthActions.LoginStart(
        {
          email: email,
          password: password
        }
      ));
    } else {
      this.store.dispatch(new AuthActions.SignupStart(
        {
          email: email, 
          password: password
        }
      ));
    }

    form.reset();
  }

  onHandleError() {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError())
  }

  private showErrorAlert(message: string) {
    // const alertComp = new AlertComponent();
    const alertCmptFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmptFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
