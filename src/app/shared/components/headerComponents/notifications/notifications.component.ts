import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/Notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];
  constructor(private notificationService: NotificationService) {}

  async ngOnInit() {
    this.notifications =
      await this.notificationService.getNotificvationsForUser();
    console.log(this.notifications);
  }

  showNotifications() {}
}
