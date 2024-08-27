<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recruit - OTP Verification</title>
</head>
<body style="background:#f9fcff; font-family: montserrat; ">
	<h3 style="line-height: 0.1;">Recruit Management</h3>
	<hr style="border: 1px solid gray;">
	<h3>Dear <span>{{ $details['name'] }}</span></h3>
    <p>Thank you for register your account in our website. Here we are requesting you to verify your email address with this One Time Password (OTP)</p>
	<div style="background: #26ae61; text-align: center; color: white; border-radius: 10px; margin: 20px 0px;">
      		<p style="padding-top: 15px; margin: 0;">Here is your OTP: </p>
      	    <p style="padding-bottom: 15px; font-size: 2.5rem; margin: 0;">{{ $details['otp'] }}</p>
  	</div>
     <p style="line-height: 1">Please Do Not Share This OTP to Anyone Else</p>
    <p style="line-height: 1">If you don't know why you get this OTP, please ignore this mail</p>
    <p style="line-height: 1">Thank you</p>
	<hr style="border: 1px solid gray;">
	<div>
      	<p style="line-height: 1; text-align: end;">© 2024 Recruit Management</p>
		<p style="line-height: 1; text-align: end;">Buduran, Jawa Timur</p>
		<p style="line-height: 1; text-align: end;">Indonesia</p>
	</div>
</body>
</html>