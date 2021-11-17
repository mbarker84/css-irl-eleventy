import { copyFile, mkdir, readdir } from 'fs/promises'
import path from 'path'

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true })
  let entries = await readdir(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let destPath = path.join(dest, entry.name)

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await copyFile(srcPath, destPath)
  }
}

copyDir('src/media', 'dist/media')
copyDir('src/favicon', 'dist/favicon')
