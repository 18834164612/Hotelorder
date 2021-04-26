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
function stayhomeDelete (sid){
   return new Promise((resolve,reject)=>{
     instance.delete('api/stayhome/'+sid).then(res=>{
       resolve(res)
     }).catch((error)=>{
      reject(error)
     })
   })
}
function stayhomeUpdate (sid,data) {
  return new Promise((resolve,reject)=>{
    instance.put('api/stayhome/'+sid,data).then((res)=>{
      resolve(res)
    }).catch((error)=>{
      reject(error)
    })
  })
}
export {stayhomeDelete,stayhomeRead,stayhomeUpdate}