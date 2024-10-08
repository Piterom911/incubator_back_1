import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.port || 3000

const products = [{ id: 1, title: "tomato" }, { id: 2, title: "orange", delivery: "bayjin" }]
const addresses = [{ id: 1, value: "Hüttenberg 6" }, { id: 2, value: "Schillerstr. 25" }]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    let query = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(query) > -1))
  } else {
    res.send(products)
  }
})

app.get('/products/:id', (req: Request, res: Response) => {
  let productId = +req.params.id
  let id = products.find(p => p.id === productId)
  if (!id) {
    res.sendStatus(404)
  } else {
    res.send(id)
  }
})

app.get('/products/title/:productTitle', (req: Request, res: Response) => {
  let productTitle = req.params.productTitle
  let product = products.find(p => p.title === productTitle)
  if (!product) {
    res.sendStatus(404)
  } else {
    res.send(product)
  }
})

app.post('/products', (req: Request, res: Response) => {
  let newTitle = req.body.title
  if (newTitle) {
    let newItem = {
      id: +(new Date()),
      title: newTitle
    }
    products.push(newItem)
    res.status(201).send(newItem)
  }
  res.sendStatus(400)
})

app.put('/products/:id', (req: Request, res: Response) => {
  let requestId = +req.params.id
  let newTitle = req.body.title
  let product = products.find(p => p.id === requestId)
  if (product && req.body.title) {
    product.title = req.body.title
    res.status(200).send(product)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  let productId = +req.params.id
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].id) {
      products.splice(i, 1)
      res.sendStatus(204)
      return
    }
  }
  res.sendStatus(404)
})

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
  let addressId = +req.params.id
  let id = addresses.find(a => a.id === addressId)
  if (!id) {
    res.sendStatus(404)
  } else {
    res.send(id)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
