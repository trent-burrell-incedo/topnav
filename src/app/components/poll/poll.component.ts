import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  title: string = 'test';

  constructor() { }

  ngOnInit(): void {
    if (!document.getElementById('importednative-shim')) {
      this.importJS('native-shim');
      this.importJS('framework-poll');
    }

    fromEvent(window, 'event').subscribe((event) => {
      this.title = `Current logged in User is ${event['detail']}`;
      this.updateData();
    });
  }

  updateData() {
    if (document.getElementById('mycontainer')) {

      const myAngularElement = document.getElementById('mycontainer');
      console.log('myAngularElement', myAngularElement);
      const el = document.createElement('framework-poll');
      el['userDetail'] = this.title;
      myAngularElement.appendChild(el);

      const polls = document.getElementsByTagName('framework-poll');
      if (polls.length > 1) {
        for (let i = 1; i < polls.length; i++) {
          polls[i].remove();
        }
      }
    }
  }


  ngOnDestroy(): void {
    this.removeJS('native-shim');
    this.removeJS('framework-poll');
  }

  importJS(name) {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.id = 'imported' + name;
    script.src = 'assets/js/' + name + '.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  removeJS(name) {
    document.getElementById('imported' + name).remove();
  }

}
