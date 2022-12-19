import http from 'http';
import { get } from './controller';


const getQueryParams = (url: string | undefined) => {
   return url?.split('?')[1].split('&').reduce((props: any, p) => {
      const prop: string[] = p.split('=');
      props[prop[0]] = prop[1];
      return props;
   }, {});
}

// create the http server
const server = http.createServer((req, res) => {
   console.log(req.method, req.url);

   // GET requests
   if (req.method == 'GET') {

      const params = getQueryParams(req.url);
      console.log('request params: ', params);

      return get(req, res, params);
   }

});

server.listen(3000, () => {
   console.log('Server is running on port 3000. Go to http://localhost:3000/')
});

// server.close()
