import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor(
    public router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['auth']);
    }
  }
}
