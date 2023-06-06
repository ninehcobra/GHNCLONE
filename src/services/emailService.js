const nodemailer = require("nodemailer");


let sendSimpleEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'giaohangle290302@gmail.com', // generated ethereal user
      pass: 'oqjyyhpjsrsdjpiu', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"GIAOHANGLE 👻" <giaohangle290302@gmail.com>', // sender address
    to: 'ttbexinhtt2903@gmail.com', // list of receivers
    subject: "Thông tin lên đơn giao hàng ✔", // Subject line
    html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thông báo đơn hàng vận chuyển thành công</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 24px;
      margin-top: 0;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>

    <h1>Đơn hàng của bạn đã được vận chuyển thành công!</h1>
    <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Đơn hàng của bạn đã được xác nhận và đã được gửi đi.</p>
    <p>Hãy kiểm tra email thường xuyên để cập nhật thông tin vận chuyển mới nhất.</p>
    <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua <a href="mailto:info@example.com">info@example.com</a>.</p>
    <a class="button" href="/">Quay về trang chủ</a>
</body>
</html>
        `, // html body
  });

}



module.exports = {
  sendSimpleEmail: sendSimpleEmail
}