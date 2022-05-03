import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/Notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { ItemNumber } from 'src/app/models/global.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  notificationReceivedSub: Subscription;
  notificationSeenSub: Subscription;
  numberNewNotifications: ItemNumber;
  constructor(
    private notificationService: NotificationService,
    private socket: Socket,
    private changeRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.notifications =
      await this.notificationService.getNotificvationsForUser();
    console.log(this.notifications);
    this.numberNewNotifications =
      await this.notificationService.getNumberOfNewNotifications();
    this.notificationReceivedSub = this.socket
      .fromEvent('notificationReceived')
      .subscribe(async (data: any) => {
        console.log('notificationReceived');
        let notif = data.notification;
        this.notifications.unshift(notif);
        this.numberNewNotifications =
          await this.notificationService.getNumberOfNewNotifications();
      });
    // this.notificationSeenSub = this.socket
    //   .fromEvent('notificationsSeen')
    //   .subscribe(async (data) => {
    //     console.log('notificationsSeen');
    //     this.notifications.filter((notif) => (notif.isNew = false));
    //     this.numberNewNotifications =
    //       await this.notificationService.getNumberOfNewNotifications();
    //   });
    this.changeRef.detectChanges();
  }

  async showNotifications() {
    this.notifications =
      await this.notificationService.getNotificvationsForUser();
    this.numberNewNotifications =
      await this.notificationService.getNumberOfNewNotifications();
  }

  ngOnDestroy(): void {
    try {
      this.notificationReceivedSub.unsubscribe();
    } catch (e) {}
    try {
      this.notificationSeenSub.unsubscribe();
    } catch (e) {}
  }
}
