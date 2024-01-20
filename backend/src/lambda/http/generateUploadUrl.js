import 'source-map-support/register'
import { createAttachmentPresignedUrl } from '../../fileStorage/attachmentUtils'
import { todoExists } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('auth')

export async function handler(event) {
  const todoId = event.pathParameters.todoId

  const userId = getUserId(event)
  
  const validTodo = await todoExists(todoId)
    if (validTodo.Count == 0) {
      logger.info(`User with id ${userId} performed generate upload url no existing todo id ${todoId}`);
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          error: 'Todo does not exist'
        })
      }
    }

    logger.info(`User with id ${userId} performed generate upload url existing todo id ${todoId}`);

    const url = createAttachmentPresignedUrl(todoId);
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: url
      })
  }
}