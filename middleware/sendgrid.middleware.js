const sgMail = require("@sendgrid/mail");

module.exports.connectPage = (req, res) => {
	try {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: "11hohuyen1114@gmail.com",
			from: "10hohuyen1114@gmail.com",
			subject: "Huyen oi there is someone into Kattie Shopping site",
			text: "https://store-2-huyen.herokuapp.com/",
			html: " https://store-2-huyen.herokuapp.com/"
		};
		sgMail.send(msg);
	} catch (error) {
		console.log(error)
	}
	res.render("index", {
		imageUrl: [
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/2020-08-08T18:43:37.379Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/2020-07-31T09:52:41.315Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/2020-08-11T12:36:10.287Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/2020-08-09T03:39:30.998Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/2020-08-09T03:31:53.617Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/2020-08-08T17:27:39.608Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/2020-08-11T12:40:30.453Z",
			"https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/tops/2020-08-08T18:43:37.379Z",
		],
		imageLink: [
			"/product/5f50d6836097939387e972cd",
			"/product/5f50d71c6097939387e972d0",
			"/product/5f50d74c6097939387e972d1",
			"/product/5f50d6f16097939387e972cf",
			"/product/5f50d6ab6097939387e972ce",
			"/product/5f50d5bf6097939387e972cc",
			"/product/5f50d7746097939387e972d2",
			"/product/5f50d6836097939387e972cd"
		]
	});
}