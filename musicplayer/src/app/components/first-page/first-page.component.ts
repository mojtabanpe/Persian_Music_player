import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


interface Music {
  name: string;
  source: string;
}
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  orderedIndexes: Array<number> = [];
  currentIndex = 0;
  musicForAdd: Music = {
    name: '',
    source: ''
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
  currentMusic: Music;
  player: any;
  cover = './././assets/img/happy-cat.jpg';
  showError = false;
  constructor() {
    this.createOrderedIndexes();
    this.shuffle();
    this.currentMusic = this.musicList[this.orderedIndexes[0]];
  }

  ngOnInit() {   

  }

  createOrderedIndexes(): void {
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

  showAddForm(): void {
    document.querySelector('.add-music-form')?.classList.remove('d-none');
    document.querySelector('.music-cover')?.classList.add('reduce-opacity');
  }
  hideAddForm(): void {
    document.querySelector('.add-music-form')?.classList.add('d-none');
    document.querySelector('.music-cover')?.classList.remove('reduce-opacity');
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
    if (this.currentIndex < this.musicList.length - 1) {
      this.currentIndex++;
    } else { this.currentIndex = 0;}
    
    audio.src = this.musicList[this.currentIndex].source;
    this.currentMusic = this.musicList[this.currentIndex];
    audio.play();
  }

  prev(audio:HTMLAudioElement): void {
    if (this.currentIndex != 0) {
      this.currentIndex--;
    } else { this.currentIndex = this.musicList.length-1;}
    
    audio.src = this.musicList[this.currentIndex].source;
    audio.play();
  }
  

}
