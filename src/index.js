import {
  intro,
  outro,
  text,
  select,
  confirm,
  multiselect,
  isCancel
} from '@clack/prompts'
import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'

import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles, getStagedFiles, gitAdd, gitCommit } from './git.js'

intro(
  colors.inverse(
    `Asistente para la creación de commits por ${colors.yellow(
      'Victor Torres'
    )}`
  )
)

const [changedFiles, errorChangedFiles] = await trytm(getChangedFiles())
const [stagedFiles, errorStagedFiles] = await trytm(getStagedFiles())

if (errorChangedFiles ?? errorStagedFiles) {
  outro(colors.red('Error: Comprueba que estás en un repositorio de git'))
  process.exit(1)
}

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan('Selecciona los ficheros que quieres añadir al commit:'),
    options: changedFiles.map(file => ({
      value: file,
      label: file
    }))
  })

  if (isCancel(files)) {
    outro(colors.yellow('No hay archivos para commitear'))
    process.exit(0)
  }

  await gitAdd({ files })
}

const commitType = await select({
  message: colors.cyan('Selecciona el tipo de commit'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(10, ' ')} . ${value.description}`
  }))
})

const commitMessage = await text({
  message: colors.cyan('Introduce el mensaje del commit:'),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El mensaje noi puede estar vacío')
    }

    if (value.length > 50) {
      return colors.red('El mensaje no puede tener más de 100 caracteres')
    }
  }
})

const { emoji, release } = COMMIT_TYPES[commitType]

let breakingChange = false
if (release) {
  breakingChange = await confirm({
    initialValue: false,
    message: `${colors.cyan(
      '¿Tiene este commit cambios que rompen la compatibilidad anterior?'
    )}
    ${colors.yellow(
      'Si la respuesta es si, deberias crear un commit con el tipo "BREAKING CHANGE" y al hacer release se publicará uan versión major'
    )}
    `
  })
}

let commit = `${emoji} ${commitType} ${commitMessage}`
commit = breakingChange ? `${commit} [breaking change]` : commit

const shouldContinue = await confirm({
  initialValue: true,
  message: `${colors.cyan('¿Quieres crear el commit con el siguiente mensaje?')}
  ${colors.green(colors.bold(commit))}
  ${colors.cyan('¿Confirmas?')}
  `
})

if (!shouldContinue) {
  outro(colors.yellow('No se ha creado el commit'))
  process.exit(0)
}

await gitCommit({ commit })

outro(
  colors.green('✔ Commit creado con éxito. ¡Gracias por usar el asistente!')
)
