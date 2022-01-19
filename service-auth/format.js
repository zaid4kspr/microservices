POST / api / v1 / users {
    phone: 25768248,
    appCode: "fdfkdk"
}
RESPONSE: message ==
    POST / api / v1 / users / resend {
        phone: 25768248
    }
RESPONSE: message ==
    POST / api / v1 / drivers / otpverification {
        code: "1v4d5",
    }
RESPONSE: User Object ==
    POST / api / v1 / users / data {
        _id: "1212102002" // From user object
        name: "ettayeb",
        lastName: "mohamed",
        email: "mohamed@IF5.tn",
        sexe: 1,
        /* 1: man , 0: women */
        image: birthday: DATE FORMAT,
        password: "dkfkdkfdkfk"
    }
RESPONSE: User Object

// LOGIN
POST / api / v1 / users / login {
    email: "med@IF5.tn",
    password: "fdfkdk"
}
RESPONSE: {
    user: USER OBJECT,
    token: "token"
}

// SOCIAL LOGIN
POST / api / v1 / users / sociallogin {
    OBJECT FROM THE PRVIDER
}

RESPONSE: {
    user: USER OBJECT,
    token: "token"
}

// SOCIAL SIGN UP
1. step one:
    POST / api / v1 / users / sociallogin {
        OBJECT FROM THE PRVIDER
    }

RESPONSE: user: NEW USER OBJECT
2. step two:

    POST / api / v1 / users / data {
        _id: "1212102002" // From user object
        name: "ettayeb",
        lastName: "mohamed",
        email: "mohamed@IF5.tn",
        sexe: 1,
        /* 1: man , 0: women */
        image: birthday: DATE FORMAT,
        password: "dkfkdkfdkfk"

    }

RESPONSE: RESPONSE: User Object
