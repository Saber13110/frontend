import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { News } from '../../shared/models/news.model';
import { Location } from '../../shared/models/location.model';
import { FAQ } from '../../shared/models/faq.model';
import { ServiceItem } from '../../shared/models/service-item.model';
import { NotificationService } from '../../shared/services/notification.service';
import { NewsService } from './services/news.service';
import { LocationService } from './services/location.service';
import { FaqService } from './services/faq.service';
import { ServiceItemService } from './services/service-item.service';
import { HeroSectionComponent } from './components/hero/hero-section.component';
import { ServicesSectionComponent } from './components/services/services-section.component';
import { NewsSectionComponent } from './components/news/news-section.component';
import { LocationsSectionComponent } from './components/locations/locations-section.component';
import { FaqSectionComponent } from './components/faq/faq-section.component';
import { CtaSectionComponent } from './components/cta/cta-section.component';

// Import Google Maps types
declare global {
  interface Window {
    google: any;
  }
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeroSectionComponent,
    ServicesSectionComponent,
    NewsSectionComponent,
    LocationsSectionComponent,
    FaqSectionComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  // === Champs du formulaire de tracking
  trackingForm: FormGroup;
  trackingNumber: string = '';

  // === Auth fake pour afficher outils avancés (à remplacer plus tard)
  isLoggedIn = true;


  // === Liste d'actualités
  news: News[] = [];

  // === Liste FAQ
  faqList: FAQ[] = [];

  locations: Location[] = [];

  // === Liste des services
  servicesList: ServiceItem[] = [];
  currentServiceIndex: number = 0;

  selectedLocation: Location | null = null;
  private map: any = null;
  private markers: any[] = [];
  private destroy$ = new Subject<void>();

  // === GESTION DES CARTES DE FONCTIONNALITÉS HERO
  // Tracks the currently selected feature card in the hero section ('barcode_scan', 'obtain_proof', or null for default track by ID)
  selectedHeroFeature: 'barcode_scan' | 'obtain_proof' | null = null;

  // Form for barcode generation
  barcodeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newsService: NewsService,
    private locationService: LocationService,
    private faqService: FaqService,
    private serviceItemService: ServiceItemService,
    private notificationService: NotificationService
  ) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{10,}$')]]
    });
    
    this.barcodeForm = this.fb.group({
      trackingId: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{10,}$')]]
    });
  }

  ngOnInit(): void {
    this.autoPushNotifications();

    this.newsService.getNews()
      .pipe(takeUntil(this.destroy$))
      .subscribe(news => (this.news = news));

    this.locationService.getLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(locations => (this.locations = locations));

    this.faqService.getFaq()
      .pipe(takeUntil(this.destroy$))
      .subscribe(faqs => (this.faqList = faqs));

    this.serviceItemService.getServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe(services => (this.servicesList = services));

    // Initialize map after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeMap();
    }, 1000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up map resources
    if (this.map) {
      this.map = null;
    }
    this.markers.forEach(marker => marker.setMap(null));
  }


  private initializeMap() {
    if (typeof window.google !== 'undefined') {
      const moroccoCenter = { lat: 31.7917, lng: -7.0926 };
      
      this.map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: moroccoCenter,
        zoom: 6,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }]
          }
        ]
      });

      this.locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: location.coordinates,
          map: this.map,
          title: location.name,
          animation: window.google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          this.selectLocation(location);
        });

        this.markers.push(marker);
      });
    }
  }

  selectLocation(location: Location) {
    this.selectedLocation = location;
    
    if (this.map && typeof window.google !== 'undefined') {
      this.map.setCenter(location.coordinates);
      this.map.setZoom(15);

      this.markers.forEach(marker => {
        marker.setAnimation(null);
        if (marker.getTitle() === location.name) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });
    }
  }

  onSubmit() {
    if (this.trackingForm.valid) {
      const trackingNumber = this.trackingForm.get('trackingNumber')?.value;
      this.router.navigate(['/tracking', trackingNumber]);
    }
  }

  // === TRAITEMENT TRACKING
  trackPackage(): void {
    if (!this.trackingForm.get('trackingNumber')?.value.trim()) return;

    this.notificationService.success(
      'Recherche en cours',
      `Recherche du colis #${this.trackingForm.get('trackingNumber')?.value}...`
    );

    setTimeout(() => {
      // TODO: remplacer par appel vers FastAPI → GET /api/tracking/:id
      this.notificationService.success(
        'Colis trouvé',
        `Colis #${this.trackingForm.get('trackingNumber')?.value} en transit.`
      );

      // Rediriger vers la page résultat
      this.router.navigate(['/tracking/result', this.trackingForm.get('trackingNumber')?.value]);
    }, 2000);
  }


  // === NOTIFICATIONS AUTO (ex: alerte livraison)
  autoPushNotifications(): void {
    const auto: Array<{type: 'success' | 'warning', title: string, message: string}> = [
      {
        type: 'success',
        title: 'Livraison prévue',
        message: 'Votre colis #GBX845 arrivera entre 10h et 13h.'
      },
      {
        type: 'warning',
        title: 'Retard possible',
        message: 'Retard signalé sur le colis #GBX999 (météo).'
      }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < auto.length) {
        const { type, title, message } = auto[i];
        this.notificationService[type](title, message);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 8000);
  }

  // === FONCTION POUR FAQ ACCORDÉON
  toggleFaq(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }

  prevService(): void {
    if (this.currentServiceIndex > 0) {
      this.currentServiceIndex--;
    }
  }

  nextService(): void {
    if (this.currentServiceIndex < this.servicesList.length - 1) {
      this.currentServiceIndex++;
    }
  }

  // === SÉLECTIONNER UNE CARTE DE FONCTIONNALITÉ HERO
  selectHeroFeature(feature: 'barcode_scan' | 'obtain_proof' | null): void {
    this.selectedHeroFeature = feature;
    // Logique additionnelle si nécessaire (ex: réinitialiser le formulaire de suivi)
    if (feature === null) {
      // Réinitialiser ou focus sur le formulaire de suivi ID si on revient au défaut
      this.trackingForm.reset();
    }
  }

  // === GESTION DU TÉLÉVERSEMENT DE FICHIER DE CODE-BARRES
  onBarcodeFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Fichier de code-barres sélectionné :', file.name);
      // TODO: Implémenter la logique pour lire l'image et extraire le code-barres
      // Vous aurez besoin d'une bibliothèque de lecture de code-barres (ex: ZXing)
      // et potentiellement d'envoyer l'image ou le code décodé au backend.
    }
  }

  onProScan(): void {
    this.router.navigate(['/services/pro-scan']);
  }

  onDownloadProof(): void {
    const trackingNumber = this.trackingForm.get('trackingNumber')?.value;
    if (trackingNumber) {
      this.router.navigate(['/services/proof', trackingNumber]);
    } else {
      this.router.navigate(['/services/proof']);
    }
  }

  // TODO: Ajouter la logique pour 'Obtain your proof' (saisie ID et bouton télécharger)

  // Method to generate barcode
  generateBarcode(): void {
    if (this.barcodeForm.valid) {
      const trackingId = this.barcodeForm.get('trackingId')?.value;
      // TODO: Implement actual barcode generation logic
      // For now, just show a notification
      this.notificationService.success(
        'Barcode Generated',
        `Barcode for tracking ID ${trackingId} has been generated.`
      );
    } else {
      this.notificationService.error(
        'Invalid Input',
        'Please enter a valid tracking ID (minimum 10 alphanumeric characters).'
      );
    }
  }
}
