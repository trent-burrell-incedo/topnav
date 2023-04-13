import { Component, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menu, menus } from 'src/app/models/menu/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu-service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  isOpenMenu: boolean = false;
  menuList: menu[] = [];
  private wasInside = false;
  profile = {};
  @Output('topNavOutEvent') topNavOutEvent: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.initializeMenu();
      this.isOpenMenu = false;
    }
    this.wasInside = false;
  }

  isMobileView: boolean;
  switchDetected: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const newIsMobileView = event.target.innerWidth <= 1024;
    if (newIsMobileView !== this.isMobileView) {
      this.isMobileView = newIsMobileView;
      this.isOpenMenu = false;
      this.initializeMenu();
    }
  }

  constructor(
    private router: Router,
    private menuService: MenuService,
    private auth: AuthService
  ) {
    this.isMobileView = window.innerWidth <= 1024;
    this.getTopNavMenu();
  }

  ngOnInit(): void {
    this.profile = this.auth.getUserDetails();
  }


  getTopNavMenu() {
    this.menuService.getPostMenu().subscribe((data: any) => {
      console.log(data);
      this.menuList = data.parentMenuItems;
      console.log(data.application);
      this.sortNavMenu(this.menuList, 'parent');

      for (let menu of this.menuList) {
        if (menu.menuLayout.name === 'DUO') {
          for (let childMenu of menu.childMenuItems) {
            if (childMenu.menuType.name === 'HEADER') {
              menu.duoMenuItems.push(childMenu);
            } else {
              menu.duoMenuItems[menu.duoMenuItems?.length - 1].childMenuItems.push(childMenu);
            }
          }
        }
      }
      this.initializeActiveMenu();
    });
  }


  sortNavMenu(menus, type) {
    if (type === 'parent') {
      menus = menus.sort((a, b) => {
        return (a.prtViewOrder > b.prtViewOrder) ? 1 : -1;
      });
      for (let menu of menus) {
        if (menu.menuLayout.name === 'DUO') {
          menu['duoMenuItems'] = [];
        }
      }
    } else {
      menus = menus.sort((a, b) => {
        return (a.chldViewOrder > b.chldViewOrder) ? 1 : -1;
      });
    }

    for (let list of menus) {
      if (list.childMenuItems.length > 1) {
        this.sortNavMenu(list.childMenuItems, 'child');
      }
    }
  }


  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  toggleSubmenu(menu) {
    if (menu?.childMenuItems?.length > 0) {
      if (window.innerWidth < 1025) {
        if (!menu.showMenu)
          this.initializeMenu();
        if (!menu?.activeMenu) {
          this.initializeActiveMenu();
        }
      }
      menu.showMenu = !menu.showMenu;
    } else {
      this.openLink('', menu);
    }
  }

  showMenu(menu) {
    if (window.innerWidth > 1024) {
      if (menu?.childMenuItems?.length > 0) {
        if (!menu.showMenu)
          this.initializeMenu();
        menu.showMenu = true;
      } else {
        this.initializeMenu();
      }
    } else {
    }
  }

  closeMenu(menu) {
    menu.showMenu = false;
  }

  openLink(childMenu, menu) {
    this.isOpenMenu = false;
    this.initializeMenu();
    if (childMenu) {
      // if (menu.menuAction.name === 'ROUTING') {
      //   // this.router.navigate([menu.menuURL]);
      //   this.topNavOutEvent.emit(menu.menuURL);
      // } else {
      //   // this.router.navigate([menu.menuURL]);
      //   // window.open(menu.menuURL, '_blank');
      //   window.open('google.com', '_blank');
      // }
      // this.topNavOutEvent.emit('https://www.youtube.com/embed/3dHNOWTI7H8');
      // window.open('google.com', '_blank');
      if (childMenu.menuItemName === 'Balances') {
        this.router.navigate(['legacy-account-view'])
      }
    } else {
      // if (menu.menuAction.name === 'ROUTING') {
      //   // this.router.navigate([menu.menuURL]);
      //   this.topNavOutEvent.emit(menu.menuURL);
      // } else {
      //   // this.router.navigate([menu.menuURL]);
      //   // window.open(menu.menuURL, '_blank');
      //   window.open('google.com', '_blank');
      // }
      // this.topNavOutEvent.emit('https://www.youtube.com/embed/3dHNOWTI7H8');
      this.router.navigate(['goals', 'a']);
    }

    if (!menu?.activeMenu) {
      this.initializeActiveMenu();
    }
    menu.activeMenu = true;
  }

  initializeMenu() {
    for (let list of this.menuList) {
      list['showMenu'] = false;
    }
  }

  initializeActiveMenu() {
    for (let list of this.menuList) {
      list['activeMenu'] = false;
    }
  }

  onLegacyAccountViewOpen() { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }


}