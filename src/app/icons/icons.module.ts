import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, DownloadCloud, AlertTriangle } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  DownloadCloud,
  AlertTriangle
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
