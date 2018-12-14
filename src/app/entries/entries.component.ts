import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  loading: boolean;

  entries: any[];

  sortedEntries: any[] = [];

  constructor(private entryService: EntriesService) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

  ngOnInit() {
    this.entryService.getEntries()
      .subscribe(entries => {
        this.entries = entries;
        const n = this.entries.length;
        for (let i = n - 1; i >= 0; i--) {
          this.sortedEntries[i] = entries[n - i - 1];
        }
      });
  }
}
