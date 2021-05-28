import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { loadUser } from "./state/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Angular';

  constructor(private readonly store: Store<{ user: string }>) { // or User object

    // load init
    this.store.dispatch(loadUser());
  }

}
