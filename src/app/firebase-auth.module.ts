import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCNoZFixsqEHUWD3eHsgrxX2RKo8UJFlAs",
  authDomain: "discrete-math-ea584.firebaseapp.com",
  projectId: "discrete-math-ea584",
  storageBucket: "discrete-math-ea584.appspot.com",
  messagingSenderId: "77848106123",
  appId: "1:77848106123:web:15d74c3d891bf74d2d708e"
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
})
export class FirebaseAuthModule {}
