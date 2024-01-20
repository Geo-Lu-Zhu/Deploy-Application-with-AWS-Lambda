import 'source-map-support/register'
import { createTodo } from '../../businessLogic/todos'
import { getToken } from '../auth/auth0Authorizer'

export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  const jwtToken = getToken(event.headers.Authorization);
  const newItem = await createTodo(newTodo, jwtToken)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}