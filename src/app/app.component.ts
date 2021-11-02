import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Zdrowie 12";
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private config: PrimeNGConfig, private tokenStorageService: TokenStorageService, private route: Router) {}

  ngOnInit() {
      this.config.ripple = true;

      this.config.setTranslation({
        startsWith: "Zacznij od",
        contains: "Zawiera",
        notContains: "Nie zawiera",
        endsWith: "Kończy się na",
        equals: "Równa się",
        notEquals: "Nie równa się",
        noFilter: "Bez filtra",
        lt: "Mniej niż",
        lte: "Mniejszy lub równy",
        gt: "Większy niż",
        gte: "Większy lub równy",
        is: "Jest",
        isNot: "Nie jest",
        before: "Przed",
        after: "Później",
        clear: "Wyczyść",
        apply: "Zastosować",
        matchAll: "Dopasuj wszystko",
        matchAny: "Dopasuj dowolne",
        addRule: "Dodaj regułę",
        removeRule: "Usuń regułę",
        accept: "Tak",
        reject: "Nie",
        choose: "Wybierać",
        upload: "Wgrywać",
        cancel: "Cancel",
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
        dayNamesMin: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
        monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        monthNamesShort: 	["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
        today: "Dzisiaj",
        weekHeader: "Tydzień",
        weak: "Słaby",
        medium: "Średni",
        strong: "Silny",
        passwordPrompt: "Wpisz hasło",
        emptyMessage: "Nie znaleziono wyników",
        emptyFilterMessage: "Nie znaleziono wyników",
      });

      this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.route.navigate(['front'])
      const user = this.tokenStorageService.getUser();

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

    ngOnDestroy() {}

    logout(): void {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
}
