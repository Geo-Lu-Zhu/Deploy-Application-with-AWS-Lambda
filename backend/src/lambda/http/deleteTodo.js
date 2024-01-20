import 'source-map-support/register'
import { deleteTodo, todoExists } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('auth')

export async function handler(event) {
  const todoId = event.pathParameters.todoId

  const userId = getUserId(event)

  const todo = await todoExists(todoId)
    if (todo.Count == 0) {
      logger.info(`User with id ${userId} performed delete no existing todo id ${todoId} `);
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo does not exist'
        })
      }
    }
    await deleteTodo(todoId);
    logger.info(`User with id ${userId} performed delete todo id ${todoId} `);
    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        Success: `Todo with id ${todoId} deleted succesffuly`
      })
    }
}
