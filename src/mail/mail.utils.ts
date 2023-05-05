export const changeTamplatePlatfoprm = (platform: string) => {
  switch (platform){
    case 'oculus':
      return './template_oculus'
    case 'pico':
      return './template_pico'
    default:
      return null
  }
}