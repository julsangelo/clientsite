<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cliff Motorshop - Password Reset Code</title>
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
        <p>Hello {{ $user->customerUsername }},</p>
        <p>You send a password reset code for your account.</p>
        <p style="text-align: center">Your code is:</p>
        <h3 style="text-align: center">{{ $resetCode }}</h3>
        <p>For any inquiries, contact us at <a href="mailto:support@cliffmotorshop.com">support@cliffmotorshop.com</a>.</p>

        <p style="text-align: center">Thank you for using Cliff Motorshop!</p>
    </div>
</body>
</html>
