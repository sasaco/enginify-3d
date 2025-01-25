import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from '@angular/material/expansion';

import { environment } from "../environments/environment";

import { InputDataService } from "./providers/input-data.service";
import { DataHelperModule } from "./providers/data-helper.module";
import { UserInfoService } from "./providers/user-info.service";

import { MenuComponent } from "./components/menu/menu.component";
import { WaitDialogComponent } from "./components/wait-dialog/wait-dialog.component";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";

import { InputNodesComponent } from "./components/input/input-nodes/input-nodes.component";
import { InputNodesService } from "./components/input/input-nodes/input-nodes.service";

import { InputSourceComponent } from "./components/input/input-source/input-source.component";
import { InputSourceService } from "./components/three/geometry/three-source.service";

import { ThreeComponent } from "./components/three/three.component";
import { SceneService } from "./components/three/scene.service";

import { StartMenuComponent } from "./components/start-menu/start-menu.component";
import { PresetComponent } from "./components/preset/preset.component";
import { PresetService } from "./components/preset/preset.service";
import { SheetComponent } from "./components/input/sheet/sheet.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ChatComponent } from './components/chat/chat.component';
import { ElectronService } from "./providers/electron.service";
import { DocLayoutComponent } from "./components/doc-layout/doc-layout.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { ActivateSessionComponent } from './components/activate-session/activate-session.component';

import { MatIconModule } from '@angular/material/icon'
import { AppService } from "./app.service";
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { LogLevel as LogLevelMasl } from "@azure/msal-browser";

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, "./assets/i18n/", ".json");

export function loggerCallback(logLevel: LogLevelMasl, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {

  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.b2cPolicies.authorities.signUpSignIn.authority,
      redirectUri: environment.msalConfig.auth.redirectUri,
      postLogoutRedirectUri: environment.msalConfig.auth.postLogoutRedirectUri,
      knownAuthorities: [environment.b2cPolicies.authorityDomain]
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevelMasl.Verbose,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiConfig.uri, environment.apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes]
    },
    loginFailedRoute: '/login-failed'
  };
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgbModule,
    DataHelperModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ScrollingModule,
    MatIconModule,
    MsalModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    WaitDialogComponent,
    AlertDialogComponent,

    InputNodesComponent,
    InputSourceComponent,

    ThreeComponent,
    StartMenuComponent,
    PresetComponent,
    SheetComponent,
    ChatComponent,
    DocLayoutComponent,
    ToolbarComponent,
    ActivateSessionComponent,
  ],
  providers: [
    AppService,
    InputDataService,
    InputNodesService,
    InputSourceService,
    PresetService,
    UserInfoService,
    SceneService,
    ElectronService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

