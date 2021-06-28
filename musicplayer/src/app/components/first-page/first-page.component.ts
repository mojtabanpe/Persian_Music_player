import { RepositoryService } from './../../services/repository.service';
import { HelperService } from './../../services/helper.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


interface Music {
  name: string;
  source: string;
}
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit, AfterViewInit {
  orderedIndexes: Array<number> = [];
  currentIndex = 0;
  disableArrows = false;
  player!: HTMLAudioElement;
  musicForAdd: Music = {
    name: '',
    source: ''
  };
  uploadSection = {
    progressPercent: 0,
    started: true,
    finished: false,
  };
  musicList: Array<Music> = [
  {
    name: 'معین نمیدونم',
    source: 'https://dl.musickhooneh.com/music/1398/6/ghadimi/Eshghe%20Man.mp3'
  },
  {
    name: 'معین قافلو',
    source: 'https://dl.musickhooneh.com/music/1400/2/ghadimi/Moein%20-%20Tanhaye%20tanha.mp3'
  }
  ];
  currentMusic!: Music;
  cover = './././assets/img/happy-cat.jpg';
  showError = false;
  showAddFormBool = false;
  initialized = false;
  constructor(private helper: HelperService, private repository: RepositoryService) {
  }

  ngOnInit() {   
    this.repository.getMusics().subscribe((res: any) => {
      this.musicList = res
      this.createOrderedIndexes();
      this.shuffle();
      this.currentMusic = this.musicList[this.orderedIndexes[0]];
      this.initialized = true;
    });
    setInterval(() => {
    }, 120);
  }

  ngAfterViewInit(): void {
    this.player = <HTMLAudioElement>(document.getElementById('audio'));
  }

  createOrderedIndexes(): void {
    console.log('oomad');
    
    this.orderedIndexes = [];
    for (let index = 0; index < this.musicList.length; index++) {
      this.orderedIndexes.push(index);      
    }
  }

  shuffle(): void {
    var currentIndex = this.orderedIndexes.length,  randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.orderedIndexes[currentIndex], this.orderedIndexes[randomIndex]] = [
        this.orderedIndexes[randomIndex], this.orderedIndexes[currentIndex]];
    }
    this.currentMusic = this.musicList[this.orderedIndexes[0]];
  }

  showMenu(): void {
    document.querySelector('.player')?.classList.add('rotate');
    document.querySelector('.menu-container')?.classList.add('rotate-reverse');
  }

  hideMenu(): void {    
    document.querySelector('.player')?.classList.remove('rotate');
    document.querySelector('.menu-container')?.classList.remove('rotate-reverse');
  }

  showAddForm(): void {
    document.querySelector('.add-music-form')?.classList.remove('d-none');
    document.querySelector('.music-cover')?.classList.add('reduce-opacity');
    this.showAddFormBool = true;
  }
  hideAddForm(): void {
    document.querySelector('.add-music-form')?.classList.add('d-none');
    document.querySelector('.music-cover')?.classList.remove('reduce-opacity');
    this.showAddFormBool = false;
  }

  onFileChanged(event: any): void {
    try {
      const selectedMusic = event.target.files[0];
      const data = new FormData();
      data.append('myFile', selectedMusic, selectedMusic.name);
      
      this.helper.uploadImage(data).subscribe((res: any) => {
        if (res !== undefined) {
          if (res.mode === 'progress') {
            this.uploadSection.progressPercent = res.percent;
          } else if (res.mode === 'init') {
            this.uploadSection.started = true;
          }
          else if (res.mode === 'finish') {
            this.uploadSection.finished = true;
            this.musicForAdd.source = res.message;
          }
        }
      });
    } catch (error) {
    }

    }

  addMusic(): void {
    if (this.musicForAdd.name === '' || this.musicForAdd.source === '') {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      return;
    }
    this.musicList.push(this.musicForAdd);
    this.repository.addMusic(this.musicForAdd).subscribe();
    this.createOrderedIndexes();
    this.shuffle();
    this.hideAddForm();
    this.musicForAdd = {
      name: '',
      source: ''
    }
  }

  play(audio:HTMLAudioElement): void {
    audio.play();
  }

  pause(audio:HTMLAudioElement): void {
    audio.pause();
  }

  next(audio:HTMLAudioElement): void {
    this.disableArrows = true;
    if (this.currentIndex < this.musicList.length - 1) {
      this.currentIndex++;
    } else { this.currentIndex = 0;}
    this.currentMusic = this.musicList[this.currentIndex];
    audio.currentTime = 0;
    audio.src = this.musicList[this.currentIndex].source; 
    const currentAudio =  audio.play();
    currentAudio.then(res => {
      this.disableArrows = false;
    })
    
  }

  prev(audio:HTMLAudioElement): void {
    if (this.currentIndex != 0) {
      this.currentIndex--;
    } else { this.currentIndex = this.musicList.length-1;}
    this.currentMusic = this.musicList[this.currentIndex];
    audio.currentTime = 0;
    audio.src = this.musicList[this.currentIndex].source;
    const currentAudio =  audio.play();
    currentAudio.then(res => {
      this.disableArrows = false;
    })
  }
  
  getAudioDuration(audio: HTMLAudioElement): any {
    return audio.duration.toFixed(0);
  }
  getCurrentTime(audio: HTMLAudioElement): any {    
    return audio.currentTime;
  }

  changeCurrentTime(event: any, audio: HTMLAudioElement): void {
    audio.currentTime = event.value;
  }
 
  

}
