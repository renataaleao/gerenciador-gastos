let database = require('../data/database')
const urlBase = '/gastos'

module.exports = (router) => {

    router.get(urlBase, (req, res) => {
        res.json(database)
    })

    router.get(urlBase + '/:id', (req, res) => {
        const id = req.params.id
        const gasto = database.find(item => item.id == id)
        res.json(gasto)
    })

    router.post(urlBase, (req, res) => {
        const novoGasto = {
            id: database.length + 1,
            nome: req.body.nome,
            data: req.body.data,
            valor: req.body.valor
        }

        database.push(novoGasto)
        res.status(200).send('Novo gasto inserido!')
    })

    router.put(urlBase + '/:id', (req, res) => {
        const id = req.params.id

        const gasto = database.find(item => item.id === +id)
        gasto.nome = req.body.nome
        gasto.data = req.body.data
        gasto.valor = req.body.valor

        res.status(200).send('Editado com sucesso!')
    })

    router.delete(urlBase + '/:id', (req, res) => {
        const newList = database.filter(item => item.id != req.params.id)
        database = newList
        res.status(200).send('Excluído com sucesso!')
    })

}