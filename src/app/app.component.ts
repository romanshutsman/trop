import { Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {

    // Production

    const config = {
      apiKey: "AIzaSyBinfoCGGOT1jL_ADeqL3KRvyUbksLJEpY",
      authDomain: "trop-staging1.firebaseapp.com",
      databaseURL: "https://trop-staging1.firebaseio.com",
      projectId: "trop-staging1",
      storageBucket: "",
      messagingSenderId: "159737933531"
    };

    firebase.initializeApp(config);
  }
}

