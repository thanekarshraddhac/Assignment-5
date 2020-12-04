const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs'); 

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/home', (req, res, next) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        res.render('customer', {
            customerData: student
        });
    });
});

app.get('/home/:name', (req, res) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        for (var i = 0; i < student.length; i++){
            if (student[i].name === req.params.name) {
                res.render('customerInfo', {
                    customer: student[i]
                });
            }
        }   
    });
});

app.get('/home/:name/orders', (req, res) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        for (var i = 0; i < student.length; i++) {
            if (student[i].name === req.params.name) {
                res.render('customerOrderList', {
                    orderList: student[i].order,
                    name: student[i].name,
                    paymentMethod: student[i].payment_details
                });
            }
        }
    });
});

app.get('/home/:name/orders/:id', (req, res) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        for (var i = 0 ; i < student.length; i++) {
            if (student[i].name === req.params.name) {
                for (var j = 0; j < student[i].order.length; j++) {
                    if (student[i].order[j].id === req.params.id) {
                        res.render('orderInfo', {
                            orderInfo: student[i].order[j],
                            paymentMethod: student[i].payment_details,
                            shipTo: student[i].shipTo,
                            billTo: student[i].billTo
                        });
                    }
                }
            }
        }
    });
});

app.get('/orderlists', (req, res) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        customer1 = student[0].order;
        customer2 = student[1].order;
        res.render('orderList', {
            orderList1: customer1,
            orderList2: customer2
        });
        
    });
});

app.get('/orderlists/:id', (req, res) => {
    fs.readFile('customer_order.json', (err, data) => {
        if (err) console.log(err);
        let student = JSON.parse(data);
        for (var i = 0 ; i < student.length; i++) {
            for (var j = 0; j < student[i].order.length; j++) {
                if (student[i].order[j].id === req.params.id) {
                    res.render('orderInfo', {
                        orderInfo: student[i].order[j],
                        paymentMethod: student[i].payment_details,
                        shipTo: student[i].shipTo,
                        billTo: student[i].billTo
                    });
                }
            }
        }
    });
});

app.listen(1200, () => {
    console.log('Server running on port 1200.');
});