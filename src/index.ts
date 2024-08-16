import express, { Request, Response } from 'express'
const app = express()
const port = process.env.port || 3000

const products = [{ id: 1, title: "tomato" }, { id: 2, title: "orange", delivery: "bayjin" }]
const addresses = [{ id: 1, value: "Hüttenberg 6" }, { id: 2, value: "Schillerstr. 25" }]

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    let query = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(query) > -1))
  }
  res.send(products)
})

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses)
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
  let productTitle = req.params.productTitle
  let product = products.find(p => p.title === productTitle)
  if (!product) {
    res.sendStatus(404)
  } else {
    res.send(product)
  }
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