import { randomUUID } from 'node:crypto'
import fastify from 'fastify'
import { connection } from './config/database.js'

const app = fastify()

function calcularidade(ano: number) {
  const anoAtual = new Date().getFullYear()
  const idade = anoAtual - ano
  return idade
}

app.get('/hello', async (request, reply) => {
  const { age } = request.query as { age?: string }
  const idadeCalculada = age ? calcularidade(Number(age)) : null

  return {
    message: 'Hello World',
    anoNascimento: age ? Number(age) : null,
    idade: idadeCalculada
  }
})

app.post('/users', async (request, reply) => {
  const body = request.body as {
    name?: string
    email?: string
    password?: string
  }

  if (!body.name || !body.email || !body.password) {
    return reply.code(400).send({ error: 'name, email e password são obrigatórios' })
  }

  const id = randomUUID()

  const [user] = await connection('users')
    .insert({
      id,
      name: body.name,
      email: body.email,
      password: body.password
    })
    .returning(['id', 'name', 'email'])

  return reply.code(201).send(user)
})
  
const port = Number(process.env.PORT) || 3333

app.listen({ port }).then(() => {
  console.log(`Rodando na porta: ${port}`)
})
