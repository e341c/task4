const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const db = require("./db.js");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

require('./passportConfig.js')

// const options = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'Task4DB',
// };

const sessionStore = new MySQLStore(db);

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        
    })
);

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/register", (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword,
        req.body.createdAt,
        req.body.updatedAt,
        req.body.status,
    ];
    const queryCheck = "SELECT * FROM Users WHERE email = ?";
    db.query(queryCheck, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            res.send({ message: "User with that Email already exists" });
        } else if (data.length == 0) {
            const queryInsert =
                "INSERT INTO Users (`name`,`email`,`password`,`createdAt`,`updatedAt`,`status`) VALUES (?)";
            db.query(queryInsert, [values], (err, data) => {
                if (err) return res.json(err);
                res.send({ message: "User created" });
            });
        }
    });
});

app.post("/login", (req, res, next) => {
    const loginTime = req.body.updatedAt;
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.json(err);
        if (!user) res.send({ message: "No user exists" });
        if (user) {
            req.login(user, (err) => {
                if (err) return res.json(err);
                res.send({ message: "Successfully Authenticated" });
                const queryUpdate =
                    "UPDATE Users SET updatedAt = ? WHERE email = ?";
                db.query(
                    queryUpdate,
                    [loginTime, req.body.email],
                    (err, data) => {
                        if (err) return res.json(err);
                    }
                );
            });
        }
    })(req, res, next);
});

app.get("/getUser", (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

app.get("/users", (req, res) => {
    const query = "SELECT * FROM Users";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/users/delete/:id", (req, res) => {
    const userId = req.params.id;
    const query = "DELETE FROM Users WHERE id = ?";

    db.query(query, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users/unblock/:id", (req, res) => {
    const userId = req.params.id;
    const query = "UPDATE Users SET status = true WHERE id = ?";

    db.query(query, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users/block/:id", (req, res) => {
    const userId = req.params.id;
    const query = "UPDATE Users SET status = false WHERE id = ?";

    db.query(query, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
