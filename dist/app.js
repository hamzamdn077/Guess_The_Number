"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//to make sure that im passing all the args
const getResponse = (data) => {
    return data;
};
let x;
let choices = 6;
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.get('/', (req, res, next) => {
    x = (Math.floor(Math.random() * 20) + 1);
    choices = 6;
    res.render('home', { choicesLeft: choices, msg: null, isOver: false });
});
app.post('/', (req, res, next) => {
    if (isNaN(req.body.enteredNumber))
        return res.render('home', getResponse({ msg: 'enter a number !', choicesLeft: choices, isOver: choices <= 0 }));
    const body = req.body;
    choices--;
    if (choices == 0)
        return res.render('home', getResponse({ msg: 'game over !', choicesLeft: choices, isOver: choices <= 0 }));
    if (body.enteredNumber > x)
        res.render('home', getResponse({ msg: 'lower !', choicesLeft: choices, isOver: choices <= 0 }));
    else if (body.enteredNumber < x)
        res.render('home', getResponse({ msg: 'higher !', choicesLeft: choices, isOver: choices <= 0 }));
    else {
        choices = 6;
        res.render('home', getResponse({ msg: 'good job !', choicesLeft: choices, isOver: true }));
    }
});
app.listen(3000, () => {
    console.log('listening');
});
