import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {
  @Input() count: number;
  @Input() pageSizeB: number;
  @Input() pageNumber: number;
  @Output() pageChanged = new EventEmitter<number>(); 

  constructor() { }

  ngOnInit(): void {
  }

  pageIsChanged(event: any) {
    this.pageChanged.emit(event.page);
  }

}
