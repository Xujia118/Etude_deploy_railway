# EC2 Deployment Steps

## Build Application
- CD into frontend, run "npm run build"
- Add "app.use(express.static("./dist"));" in server.js. Adjust the path if necessary
- Make sure the built application runs locally without React server running
- Make the final commit, push it to GitHub 

## Launch EC2 instance, get key-value pair, get into Ubuntu instance
- sudo apt update (Update the server)
- sudo apt install nginx (Install nginx)
- (Go to AWS EC2 console, past Public IPv4 address in browser)
- sudo apt install -y npm 
- which npm (To verify npm)
- sudo apt install -y nodejs
- node -v (To verfity node.js)
- sudo apt install pm2@latest -g (So that the app will run when terminal is killed)

## git clone the repository to Linux 
- npm install in both frontend and backend folders
- CD into frontend, run "npm run build" in frontend. 
- CD out.
- pm2 start server.js --name (give an application name)
- pm2 logs 0 (to check status. Node application should be running, with our own listening to port message)

## Configure Nginx Server
- sudo vim /etc/nginx/sites-available/default 
- comment all the directives in location. Paste the following:

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        # try_files $uri $uri/ =404;
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
