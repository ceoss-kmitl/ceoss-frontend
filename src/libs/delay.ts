export const delay = (second: number) =>
  new Promise((resolve) => {
    const millisecond = second * 1000
    setTimeout(() => {
      resolve('OK')
    }, millisecond)
  })
