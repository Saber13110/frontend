import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../../shared/models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['../../home.component.scss']
})
export class NotificationsComponent {
  @Input() notifications: Notification[] = [];
  @Output() remove = new EventEmitter<Notification>();
}
