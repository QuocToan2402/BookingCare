require("dotenv").config();
import { reject } from "lodash";
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare " <minhluu15012000@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưc
    để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
    </p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
    </div>
    `, // html body
  });
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = `<h3>Xin chào ${dataSend.patientName}</h3>
  <p>Bạn nhận được mail này vì đã đặt lịch khám bệnh trên BookingCare </p>
  <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kém </p>


  <div> Xin chân thành cảm ơn </div>
  
  `;
  return result;
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: 'Mail từ BoookingCare "<bookingcare@gmail.com>',
        to: dataSend.email,
        subject: "Kết quả đặt lịch khám bệnh",
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
