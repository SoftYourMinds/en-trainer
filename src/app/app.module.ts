import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main_components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/main_components/footer/footer.component';
import { LoginComponent } from './components/main_components/login/login.component';
import { RegistrationComponent } from './components/main_components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/materials/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { ImgLazyLoadComponent } from './shared/components/img-lazy-load/img-lazy-load.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { SignUpPageComponent } from './layouts/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './layouts/log-in-page/log-in-page.component';
import { JwtModule,JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { EmailEditPipe } from './shared/pipes/email-edit.pipe';
import { StartPageComponent } from './layouts/start-page/start-page.component';
import { HeaderProfileComponent } from './components/user_components/header-profile/header-profile.component';
import { CollectionControlPanelComponent } from './components/user_components/collection-panel/collection-control-panel.component';
import { RepeatPanelComponent } from './components/user_components/repeat-panel/repeat-panel.component';
import { LearnPanelComponent } from './components/user_components/learn-panel/learn-panel.component';
import { AchivmentsPanelComponent } from './components/user_components/achivments-panel/achivments-panel.component';
import { AddCollectionCardComponent } from './components/user_components/collection-crud/add-collection-card/add-collection-card.component';
import { CollectionsViewComponent } from './components/user_components/collections-view/collections-view.component';
import { CollectionComponent } from './components/user_components/collection/collection.component';
import { CreateCollectionDialogComponent } from './components/user_components/collection-crud/create-collection-dialog/create-collection-dialog.component';
import { AuthorizationInterceptor } from './helpers/authorization.interceptor';
import { AuthErrorInterceptor } from './helpers/auth-error.interceptor';
import { SliderComponent } from './shared/components/slider/slider.component';
import { EditCollectionsDialogComponent } from './components/user_components/collection-crud/edit-collections-dialog/edit-collections-dialog.component';
import { LoadMoreComponent } from './shared/components/load-more/load-more.component';
import { CollectionPageComponent } from './layouts/collection-page/collection-page.component';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/user_components/search/search.component';
import { WordPanelComponent } from './components/user_components/words_components/word-panel/word-panel.component';
import { WordsViewComponent } from './components/user_components/words_components/words-view/words-view.component';
import { WordComponent } from './components/user_components/words_components/word/word.component';
import { ExamplesComponent } from './components/user_components/words_components/examples/examples.component';
import { TrainingComponent } from './layouts/training/training.component';
import { TaskChoiseComponent } from './components/user_components/training-componets/task-choise/task-choise.component';
import { SpeachSyntesistDirective } from './shared/fitches/speach-syntesist.directive';
import { ListeningTaskComponent } from './components/user_components/training-componets/listening-task/listening-task.component';
import { AudioPuzzleComponent } from './components/user_components/training-componets/audio-puzzle/audio-puzzle.component';
import { WriteTaskComponent } from './components/user_components/training-componets/write-task/write-task.component';
import { ResultTrainingComponent } from './components/user_components/training-componets/result-training/result-training.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    ImgLazyLoadComponent,
    SnackBarComponent,
    ProgressBarComponent,
    SignUpPageComponent,
    LogInPageComponent,
    EmailEditPipe,
    StartPageComponent,
    HeaderProfileComponent,
    CollectionControlPanelComponent,
    RepeatPanelComponent,
    LearnPanelComponent,
    AchivmentsPanelComponent,
    AddCollectionCardComponent,
    CollectionsViewComponent,
    CollectionComponent,
    CreateCollectionDialogComponent,
    SliderComponent,
    EditCollectionsDialogComponent,
    LoadMoreComponent,
    CollectionPageComponent,
    BreadcrumbsComponent,
    SearchComponent,
    WordPanelComponent,
    WordsViewComponent,
    WordComponent,
    ExamplesComponent,
    TrainingComponent,
    TaskChoiseComponent,
    SpeachSyntesistDirective,
    ListeningTaskComponent,
    AudioPuzzleComponent,
    WriteTaskComponent,
    ResultTrainingComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
