import { Component, signal, OnInit, inject, HostListener } from '@angular/core';
import AOS from 'aos';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private translate = inject(TranslateService);
  
  protected readonly title = signal('laznya-app');
  protected isMenuOpen = signal(false);
  protected currentLang = signal('ua');
  protected selectedImage = signal<string | null>(null);

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    this.closeLightbox();
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  openLightbox(imagePath: string) {
    this.selectedImage.set(imagePath);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage.set(null);
    document.body.style.overflow = '';
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  ngOnInit() {
    this.translate.addLangs(['ua', 'en', 'de', 'it', 'fr']);
    this.translate.setDefaultLang('ua');
    
    // Check if there's a saved language or use browser language
    const browserLang = this.translate.getBrowserLang();
    const targetLang = browserLang && ['ua', 'en', 'de', 'it', 'fr'].includes(browserLang) ? browserLang : 'ua';
    
    this.translate.use(targetLang);
    this.currentLang.set(targetLang);

    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
}
