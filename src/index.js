import { intro, outro, text } from '@clack/prompts'

intro('Asistente para la creación de commits por Victor Torres')

const commitMessage = await text({
  message: 'Introduce el mensaje del commit:',
  placeholder: 'Add new feature'
})

console.log(commitMessage)

outro('Commit creado con éxito. ¡Gracias por usar el asistente!')
