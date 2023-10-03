import React, { useEffect } from 'react';

const GooglePayButton = ({ price, onPaymentSuccess, onPaymentFailure }) => {
  useEffect(() => {
    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'YOUR_PAYMENT_GATEWAY_NAME',
              gatewayMerchantId: 'YOUR_MERCHANT_ID',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: 'YOUR_MERCHANT_ID',
        merchantName: 'Your Merchant Name',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: price,
        currencyCode: 'USD',
      },
    };

    const paymentsClient = new google.payments.api.PaymentsClient({
      environment: 'TEST', // Change to 'PRODUCTION' for production environment
    });

    const button = paymentsClient.createButton({
      onClick: () => {
        const paymentRequest = new google.payments.api.PaymentDataRequest(paymentDataRequest);

        paymentsClient.loadPaymentData(paymentRequest).then((paymentData) => {
          // Handle successful payment
          onPaymentSuccess(paymentData);
        }).catch((error) => {
          // Handle payment failure
          onPaymentFailure(error);
        });
      },
    });

    button.mount('#google-pay-button'); // Mount the button to a specific DOM element
  }, [price, onPaymentSuccess, onPaymentFailure]);

  return <div id="google-pay-button"></div>;
};

export default GooglePayButton;
