export const logRequest = (req, res, next) => {
  console.log(`${millisToString()} - ${req.method} ${req.originalUrl} - ${req.tag}`)
  // console.log(`${millisToString()} - ${req.method} ${req.path} - ${req.tag}`)
  return next()
}

export const millisToString = (date = new Date(Date.now())) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}

export const pageSize = 10
