export function log(type: string) {
    const today = new Date()
    const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    console.log(`${hours}:${minutes}:${seconds}, ${type}`)
}
