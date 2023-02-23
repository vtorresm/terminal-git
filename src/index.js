import { intro, outro, text, select } from '@clack/prompts'
import { COMMIT_TYPES } from './commit-types.js'

intro('Asistente para la creación de commits por Victor Torres')

const commitTypes = await select({
  message: 'Selecciona el tipo de commit',
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key} . ${value.description}`
  }))
})

console.log(commitTypes)

const commitMessage = await text({
  message: 'Introduce el mensaje del commit:',
  placeholder: 'Add new feature'
})

console.log(commitMessage)

outro('Commit creado con éxito. ¡Gracias por usar el asistente!')
