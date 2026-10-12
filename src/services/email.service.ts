export class EmailService {
  static async sendCommissionNotification(to: string, clientName: string, projectTitle: string) {
    console.log(`[Email Service] Commission inquiry sent to ${to} for "${projectTitle}" by ${clientName}`);
    return { success: true };
  }

  static async sendOrderConfirmation(to: string, orderNumber: string) {
    console.log(`[Email Service] Order confirmation sent to ${to} for order #${orderNumber}`);
    return { success: true };
  }
}
