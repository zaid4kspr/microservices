var request = require("supertest")
var should = require("should")
var mailer = require('../app/helpers/mailer')

var transporter = mailer.create()



var acheteurToken, vendeurToken, articleId


describe("Mailing test", function () {

    it("Should send an email", async function (done) {
        //        this.timeout(15000)
        var mailOptions = mailer.mailOptions('0l5rigiv9yzouw@dkimvalidator.com', 'teeessstt email', 'reset')
        await transporter.sendMail(mailOptions)


    })



})
