import { intro, outro, text, select } from '@clack/prompts'
import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'

import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles } from './git.js'

intro(
  colors.inverse(
    `Asistente para la creación de commits por ${colors.yellow(
      'Victor Torres'
    )}`
  )
)

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles())

if (errorChangedFiles) {
  outro(colors.red('Error: Comprueba que estás en un repositorio de git'))
  process.exit(1)
}

console.log(changedFiles)

const commitTypes = await select({
  message: colors.cyan('Selecciona el tipo de commit'),
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
