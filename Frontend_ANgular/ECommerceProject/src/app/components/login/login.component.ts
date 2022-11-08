import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaSignIn from '@okta/okta-signin-widget';
import ecommerceAppConfig from 'src/app/config/ecommerce-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new oktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: ecommerceAppConfig.oidc.issuer,
      clientId: ecommerceAppConfig.oidc.clientId,
      redirectUrl: ecommerceAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: ecommerceAppConfig.oidc.issuer,
        scopes: ecommerceAppConfig.oidc.scopes,
      },
    });
  }

  ngOnInit() {
    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      }, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }

  ngOnDestroy() {
    this.oktaSignin.remove();
  }
}
