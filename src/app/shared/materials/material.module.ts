import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';


const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  ScrollingModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatToolbarModule,
  LayoutModule,
  MatDividerModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatTooltipModule,
  MatTabsModule,
];

@NgModule({
    imports: [
      MaterialComponents
    ],
    exports: [
      MaterialComponents
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
    ]
  })
  export class MaterialModule { }