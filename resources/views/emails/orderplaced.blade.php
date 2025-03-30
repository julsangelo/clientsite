<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliff Motorshop - Order Confirmation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body style="font-family: Arial, sans-serif; background-color: #d4f2ff; padding: 20px;">
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; column-gap: 15px;">
            <p style="font-weight: 900; font-size: 40px; color: #065477; font-family: 'Chivo', sans-serif; font-style: italic; width: fit-content; margin: 0; line-height: 0.9;">
                CLIFF
            </p>
            <p style="font-size: 15.4px; width: 105px; margin: 0;">Motor Parts and Accesories</p>
        </div>
        
        <h3 style="color: #333;">Thank you for placing your order!</h3>
        <p>Hello {{ $customer->customerUsername }},</p>
        <p>Your order <strong>#{{ $order->orderID }}</strong> has been placed successfully.</p>

        <h3>Order Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product Image</th>
                    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
                    <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
                    <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
                    <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orderItems as $item)
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 10px;">
                            <img src="{{ asset('hydrogen/' . $item->productImage) }}" alt="{{ $item->productName }}" 
                                style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $item->productName }}</td>
                        <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">₱{{ number_format($item->orderItemPrice, 2) }}</td>
                        <td style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">{{ $item->orderItemQuantity }}</td>
                        <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">₱{{ number_format($item->orderItemTotal, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <h4 style="text-align: right;">Total: ₱{{ number_format($order->orderTotal, 2) }}</h4>

        @if ($invoiceUrl)
            <p><strong>Payment Pending:</strong> Click the link below to complete your payment:</p>
            <p><a href="{{ $invoiceUrl }}" style="background: #1ea1d7; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;" target="_blank">Pay Now</a></p>
        @else
            <p><strong>Payment Method:</strong> Cash on Delivery</p>
        @endif

        <p>For any inquiries, contact us at <a href="mailto:support@cliffmotorshop.com">support@cliffmotorshop.com</a>.</p>

        <p style="text-align: center;">Thank you for shopping with Cliff Motorshop!</p>
    </div>
</body>
</html>
