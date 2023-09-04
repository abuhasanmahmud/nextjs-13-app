import nodemailer from "nodemailer";
import { html } from "./htmlEmail";

// const sendEmail = async ({ to, url, text }) => {
//   // console.log("to", to, "url", url, "text", text);
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       password: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOption = {
//     from: process.env.EMAIL_USER,
//     to: "mahmud.me420@gmail.com",
//     subject: "nextjs 13 lates app",
//     html: `
//       <h2> ${url} </h2>
//       <p>  ${text} </p>
//     `,
//   };

//   const result = await transporter.sendMail(mailOption);
//   return result;
// };

// export default sendEmail;

export const sendEmail = async ({ to, url, text }) => {
  // console.log("user", process.env.SMPT_USER, to);
  // console.log("url", url, "to ...........", to, "text........", text);
  let config = {
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  await transporter.sendMail({
    from: process.env.SMPT_USER,
    to: to,
    subject: "email verification",
    html: html({ url, text }),
  });
};
