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
    <p>We already hear your request about reset your email password in our platform. Here we are requesting you to update your password by clickling link below.</p>
	<div style="border-radius: 10px; margin: 20px 0px;">
            <a style="color: #26ae61; font-size: 1.3rem; margin-left: 10px;" href="http://localhost:3000/auth/forgot-password/{{ $details['token'] }}/{{$details['hashEmail']}}">Reset Password Here</a>

  	</div>
     <p style="line-height: 1">Please Do Not Share This Reset Password Link to Anyone Else</p>
    <p style="line-height: 1">If you don't know why you get this link, please ignore this mail</p>
    <p style="line-height: 1">Thank you</p>
	<hr style="border: 1px solid gray;">
	<div>
      	<p style="line-height: 1; text-align: end;">© 2024 Recruit Management</p>
		<p style="line-height: 1; text-align: end;">Buduran, Jawa Timur</p>
		<p style="line-height: 1; text-align: end;">Indonesia</p>
	</div>
</body>
</html>