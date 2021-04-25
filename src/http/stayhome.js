import instance from '@/http/http'

function stayhomeRead (sid){
  return new Promise((resolve,reject)=>{
    instance.get('api/stayhome/'+sid).then((res)=>{
      resolve(res)
    }).catch((error)=>{
      reject(error)
    })
  })
}
function stayhomeDelete (){

}
export {stayhomeDelete,stayhomeRead}