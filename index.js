const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(cors())

const responseGenerator = (success = false, data= null) => {
    return {success, data}
}

let products = [
    {
        id: 1,
        name: 'Canon EOS 2000D',
        price: 459.95
    },
    {
        id: 2,
        name: 'Apple MacBook Air 2020',
        price: 1199.00
    },
    {
        id: 3,
        name: 'Sony X950H 48 Inch TV',
        price: 385.99
    }
]
app.get('/' , (req, res) => {
    res.json([
        {method: "GET", 'URL' : '/products'},
        {method: "GET", 'URL' : '/products/{id}'},
        {method: "POST", 'URL' : '/products/'},
        {method: "PATCH", 'URL' : '/products/{id}'},
        {method: "DELETE", 'URL' : '/products/'},

    ])
})

app.use(bodyParser.json())

app.get('/products/' , (req, res) => {
    res.json({success: true, data: products})
})

app.get('/products/:id' , (req, res) => {
    const specificProduct = products.find(pd=> pd.id === Number(req.params.id))
    res.json(responseGenerator(!!specificProduct, specificProduct))
})

app.post('/products' , (req, res) => {
    products.push(req.body)
    res.json(responseGenerator(true, products))
})

app.patch('/products/:id', (req, res) => {
    products = products.map(pd=> {
        if(pd.id === Number(req.params.id)) {
            pd = {...pd , ...req.body}
        }
        return pd
    })

    res.json(responseGenerator(true, products))
})

app.delete('/products/:id' , (req, res) => {
    products =  products.filter(pd=> pd.id !== Number(req.params.id));
    res.json(responseGenerator(true, products))
})

app.listen(process.env.PORT, () => console.log("Listing for port : " + process.env.PORT))