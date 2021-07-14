import Axios from 'axios'
        const service = Axios.create({
            baseURL:'https://api.map.baidu.com/',
            // baseURL:'/api1',

            // baseURL:'https://api.bimface.com/',
            // timeout: 5000, // request timeout
            headers: {
                        'content-type':'application/json',
                        'Authorization':''
                    },
          })
          
          // request interceptor
          service.interceptors.request.use(
            config => {
              // do something before request is sent
              console.log(config)
              if(config.dev){
                config.headers['Authorization'] = config.dev
              }
              return config
            },
            error => {
              return Promise.reject(error)
            }
          )
          
          // response interceptor
          service.interceptors.response.use(
            /**
             * If you want to get http information such as headers or status
             * Please return  response => response
            */
          
            /**
             * Determine the request status by custom code
             * Here is just an example
             * You can also judge the status by HTTP Status Code
             */
            response => {
              const res = response.data
              // if the custom code is not 20000, it is judged as an error.
            //   if (res.errcode != 0) {
                
            //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            //     if (res.errcode == 401 ) {
            //       alert('登录过期，请重新登录！')
            //       window.location.href = '/#/'
            //     }
            //     else if(res.errcode == 211){
            //       alert(res.errmsg)
            //     }
            //     // return Promise.reject(new Error(res.errmsg || 'Error'))
            //   } else {
            //     return response
            //   }
            return response

            },
            error => {
              return Promise.reject(error)
            }
          )

          export default service
