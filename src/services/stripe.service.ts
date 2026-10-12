export class StripeService {
  static async createCheckoutSession(params: {
    artworkTitle: string;
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    console.log('[Stripe Service] Creating checkout session for:', params.artworkTitle);
    return {
      sessionId: 'cs_test_mock_session_id',
      url: params.successUrl,
    };
  }
}
