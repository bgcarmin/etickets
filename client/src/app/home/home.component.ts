import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apiUrl = environment.apiUrl;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToStore() {
    this.router.navigate(['/store']);
  }

}
