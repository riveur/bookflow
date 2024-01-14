import Notification from 'App/Models/Notification'
import { NotificationStatus } from 'Contracts/enums'

export default class NotificationService {
  public async getUserNotifications(userId: string) {
    const notifications = await Notification.query()
      .where('user_id', userId)
      .orderBy('date', 'desc')
    return notifications
  }

  public async readNotification(notificationId: string) {
    const notification = await Notification.findOrFail(notificationId)
    await notification.merge({ status: NotificationStatus.READ }).save()
    return notification
  }
}
