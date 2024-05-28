export const changeTamplatePlatfoprm = (platform: string) => {
  switch (platform){
    case 'oculus':
      console.log('CHECH STAGE 5a')
      return './template_oculus'
    case 'pico':
      console.log('CHECH STAGE 5b')
      return './template_pico'
    default:
      console.log('CHECH STAGE 5c')
      return null
  }
  console.log('CHECH STAGE 5d')
}