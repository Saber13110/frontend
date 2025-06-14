import { Routes } from '@angular/router';
import { HelpComponent } from './help.component';
import { TrackingAdviceComponent } from './tracking-advice/tracking-advice.component';
import { TrackingToolsComponent } from './tracking-tools/tracking-tools.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TrackingGuideComponent } from './tracking-advice/tracking-guide/tracking-guide.component';
import { StatusGuideComponent } from './tracking-advice/status-guide/status-guide.component';
import { TroubleshootingComponent } from './tracking-advice/troubleshooting/troubleshooting.component';
import { NotificationPreferencesComponent } from './tracking-advice/notification-preferences/notification-preferences.component';
import { DeliveryTimesComponent } from './tracking-advice/delivery-times/delivery-times.component';
import { SecurityInfoComponent } from './tracking-advice/security-info/security-info.component';
import { BulkTrackingComponent } from './tracking-tools/bulk-tracking/bulk-tracking.component';
import { MobileAppComponent } from './tracking-tools/mobile-app/mobile-app.component';
import { ApiAccessComponent } from './tracking-tools/api-access/api-access.component';
import { EmailTrackingComponent } from './tracking-tools/email-tracking/email-tracking.component';
import { TrackingReportsComponent } from './tracking-tools/tracking-reports/tracking-reports.component';
import { IntegrationsComponent } from './tracking-tools/integrations/integrations.component';

export const HELP_ROUTES: Routes = [
  {
    path: '',
    component: HelpComponent,
    children: [
      {
        path: '',
        redirectTo: 'advice',
        pathMatch: 'full'
      },
      {
        path: 'advice',
        component: TrackingAdviceComponent
      },
      {
        path: 'tools',
        component: TrackingToolsComponent
      },
      {
        path: 'faq',
        component: FaqsComponent
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'tracking-guide',
        component: TrackingGuideComponent
      },
      {
        path: 'status-guide',
        component: StatusGuideComponent
      },
      {
        path: 'troubleshooting',
        component: TroubleshootingComponent
      },
      {
        path: 'notification-preferences',
        component: NotificationPreferencesComponent
      },
      {
        path: 'delivery-times',
        component: DeliveryTimesComponent
      },
      {
        path: 'security-info',
        component: SecurityInfoComponent
      },
      {
        path: 'bulk-tracking',
        component: BulkTrackingComponent
      },
      {
        path: 'mobile-app',
        component: MobileAppComponent
      },
      {
        path: 'api-access',
        component: ApiAccessComponent
      },
      {
        path: 'email-tracking',
        component: EmailTrackingComponent
      },
      {
        path: 'tracking-reports',
        component: TrackingReportsComponent
      },
      {
        path: 'integrations',
        component: IntegrationsComponent
      }
    ]
  }
];
