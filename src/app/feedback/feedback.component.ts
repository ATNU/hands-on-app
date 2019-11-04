import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
feedbackText: string;
id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private file: File) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  async saveFeedback() {
    console.log(this.feedbackText + this.id);
    const data = [ { id: this.id, feedback: this.feedbackText} ];
    const dataString = JSON.stringify(data);
    this.save(dataString).then(() => this.router.navigate(['/home']));


}
  async directoryExists() {
    return await this.file.checkDir(this.file.documentsDirectory, 'Feedback');
  }
  async save(dataString: string) {
    // check if file exists and create and write, or write only
    if (this.directoryExists()) {
      this.file.writeExistingFile(this.file.documentsDirectory, 'Feedback', dataString)
          .then(() => this.file.createFile(this.file.documentsDirectory, 'Feedback', false));
    } else {
      await this.file.createFile(this.file.documentsDirectory, 'Feedback', false);
    }
  }

}
