/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {OwnersModule} from './owners/owners.module';
import {PetsModule} from './pets/pets.module';
import {VisitsModule} from './visits/visits.module';
import {PetTypesModule} from './pettypes/pettypes.module';
import {VetsModule} from './vets/vets.module';
import {PartsModule} from './parts/parts.module';
import {SpecialtiesModule} from './specialties/specialties.module';
import {HttpErrorHandler} from './error.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ProfileComponent } from './security/profile/profile.component';

import { authInterceptorProviders } from './security/_helpers/auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OwnersModule,
    PetsModule,
    VisitsModule,
    PetTypesModule,
    VetsModule,
    SpecialtiesModule,
    PartsModule,
    BrowserAnimationsModule,
    AppRoutingModule
     //, ToastrModule.forRoot() // ToastrModule added
     
     , FormsModule 
     , ReactiveFormsModule     
     , MatButtonModule
     , MatInputModule
     , MatCardModule 
  ],
  providers: [
    HttpErrorHandler,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
