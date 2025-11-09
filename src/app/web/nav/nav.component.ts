import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  nav :NavItem[] = [
    {name: "Domů", link: "/home"},
    {name: "O nás", link: "/o-nas"},
    {name: "Články", link: "/clanky"},
    {name: "Přestupy", link: "/prestupy"},
    {name: "Zajímavosti", link: "/zajimavosti"},
    {name: "Rozhovory", link: "/rozhovory"},
  ]

  @ViewChild('navbox') navbox!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  @ViewChild('baner') baner!: ElementRef;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 170) {
      this.renderer.setStyle(this.navbox.nativeElement, 'height', '50px');
      this.renderer.setStyle(this.img.nativeElement, 'height', '50px');
      this.renderer.setStyle(this.img.nativeElement, 'width', '50px');
      this.renderer.setStyle(this.baner.nativeElement, 'height', '0px');
    } else {
      this.renderer.setStyle(this.navbox.nativeElement, 'height', '100px');
      this.renderer.setStyle(this.img.nativeElement, 'height', '100px');
      this.renderer.setStyle(this.img.nativeElement, 'width', '100px');
      this.renderer.setStyle(this.baner.nativeElement, 'height', '150px');
    }
  }
}
export interface NavItem {
  name: string;
  link: string;
}
