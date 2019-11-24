import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseURL = environment.apiURL;
  currentMain;
  // hasAnotherDropZoneOver: boolean;
  // response: string;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {

    this.intializeUploader();
    // this.hasBaseDropZoneOver = false;
    // this.hasAnotherDropZoneOver = false;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public intializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          // isApproved: res.isApproved
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };


  }

  public setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {

      this.currentMain = this.photos.filter(x => x.isMain)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      // this.getMemberPhotoChange.emit(photo.url);

      this.alertify.success('successfully set main photo');
    },
      error => {
        this.alertify.error(error);
      });
  }

  deletePhoto(id: number) {

    this.alertify.confirm('are you sure you want to dele this photo?', () => {

      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('photo has been deleted');
      }, error => {
        this.alertify.error('failed to delete photo.');
      });

    });
  }

  ngOnInit() {
  }

}
