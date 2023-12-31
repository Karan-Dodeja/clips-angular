import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'
import { v4 as uuid } from 'uuid';
import { combineLatest, forkJoin, last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { ClipService } from '../../services/clip.service';
import { Router } from '@angular/router';
import { FfmpegService } from '../../services/ffmpeg.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit, OnDestroy {

  isDragover = false
  file: File | null = null
  nextStep = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! your clip being uploaded.'
  inSubmission = false
  percentage = 0
  showPercentage = false
  user: firebase.User | null = null
  task?: AngularFireUploadTask
  screenshots: string[] = []
  selectedScreenshot = ''
  screenshotTask?: AngularFireUploadTask

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  },)

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService
  ) {
    auth.user.subscribe(user => this.user = user),
      ffmpegService.init()
  }

  ngOnDestroy(): void {
    this.task?.cancel()
  }

  ngOnInit() {

  }

  async storeFile($event: Event) {
    if (this.ffmpegService.isRunning) {
      return
    }

    this.isDragover = false

    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.screenshots = await this.ffmpegService.getScreenshot(this.file)
    this.selectedScreenshot = this.screenshots[0]

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true

  }

  async uploadFile() {
    this.uploadForm.disable()

    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! your clip being uploaded.'
    this.inSubmission = true
    this.showPercentage = true

    const clipFielName = uuid() // return random unique id
    const clipPath = `clips/${this.file?.name}.mp4`

    const screenshotBlob = await this.ffmpegService.blobFromURL(
      this.selectedScreenshot
    )
    const screenshotPath = `screenshots/${clipFielName}.png`

    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath)

    this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob)
    const screenshotRef = this.storage.ref(screenshotPath)

    combineLatest([this.task.percentageChanges(),
    this.screenshotTask.percentageChanges()]).subscribe((progress) => {
      const [clipProgess, screenshotProgress] = progress
      if (!clipProgess || !screenshotProgress) {
        return
      }
      const total = clipProgess + screenshotProgress
      this.percentage = total as number / 200
    })


    forkJoin([this.task.snapshotChanges(),
    this.screenshotTask.snapshotChanges()]).pipe(
      switchMap(() => forkJoin([clipRef.getDownloadURL(),screenshotRef.getDownloadURL()]))
    ).subscribe({
      next: async (urls) => {
        const [clipURL, screenshotURL] = urls
       
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFielName}.mp4`,
          url: clipURL,
          screenshotURL,
          screenshotFileName: `${clipFielName}.png`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        const clipDocRef = await this.clipsService.createClip(clip)

        this.alertColor = 'green'
        this.alertMsg = 'Success!'
        this.showPercentage = false

        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id
          ])
        }, 1000)
      },
      error: (error) => {
        this.uploadForm.enable()
        this.alertColor = 'red'
        this.alertMsg = 'Upload failed! try again later.'
        this.inSubmission = true
        this.showPercentage = false

      }
    })

  }

}
