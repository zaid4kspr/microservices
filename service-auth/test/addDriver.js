const request = require("supertest")
const should = require("should")
const app = require('../index')
const fs = require("fs")
const MockDate = require('mockdate')
MockDate.set(Date.now());

let driverPhone = {
    phone: 25768248
}
let otpcode = {
    code: 22651
};
let driverData = {
    _id: '5f634b75dce67622458f0d12',
    name: "mohamed",
    lastName: "ettayeb",
    birthday: new Date().toString(),
    gender: 1,
    services: [1, 2],
    password: "intigo2020",
    image: fs.readFileSync("/home/traximus/Desktop/things/backend/test/test.png")
}

describe("Create new driver", function () {

    /* it("should create new driver using his phone number", function (done) {
         //        this.timeout(15000)        
         request(app)
             .post('/api/v1/drivers')
             .send(driverPhone)
             .end(function (err, res) {
                 res.status.should.equal(200);
                 console.log(res.body);
                 done();
             })
     })*/

    /*   it("should resend the otp code to the same phone number", function (done) {
           //        this.timeout(15000)        
           request(app)
               .post('/api/v1/drivers/resend')
               .send(driverPhone)
               .end(function (err, res) {
                   res.status.should.equal(200);
                   console.log(res.body);
                   done();
               })
       }) */

    /* it("should post the OTP verification code received via phone and confirm the phone number", function (done) {
         //        this.timeout(15000)        
         request(app)
             .post('/api/v1/drivers/otpverification')
             .send(otpcode)
             .end(function (err, res) {
                 res.status.should.equal(200);
                 console.log(res.body);
                 done();
             })
     })*/

    it("should post the driver data + ID + image file", function (done) {
        //        this.timeout(15000)  
        request(app)
            .post('/api/v1/drivers/data')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field("_id", driverData._id)
            .field("name", driverData.name)
            .field("lastName", driverData.lastName)
            .field("gender", driverData.gender)
            .field("services", driverData.services)
            .field("password", driverData.password)
            .field("birthday", driverData.birthday)
            .attach('image', fs.readFileSync("/home/traximus/Desktop/things/backend/test/test.png"))
            .end(function (err, res) {
                console.log(res.body);
                res.status.should.equal(200);
                done();
            })
    })


})
