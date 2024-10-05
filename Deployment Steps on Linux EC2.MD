# EC2 Deployment Steps

## Launch EC2 instance, get key-value pair, get into Ubuntu instance
- sudo apt update (Update the server)
- sudo apt install nginx (Install nginx)
- (Go to AWS EC2 console, past Public IPv4 address in browser, use http, not https)
- sudo apt install -y npm 
- which npm (To verify npm)
- sudo apt install -y nodejs
- node -v (To verfity node.js)
- sudo npm install -g pm2  (So that the app will run when terminal is killed)

## Build Application
- Make sure the built application runs locally without React server running
- CD into backend, add "app.use(express.static("../frontend/dist"));" in server.js
- CD into frontend, update BASE_URL in service with IPv4 address of the EC2 instance
- run "npm run build"
- Make the final commit, push it to GitHub 

(If you use Amplify)
In Amplify, edit build yaml file as follows:

version: 1
frontend:
    phases:
        preBuild:
            commands:
                - cd frontend(adjust as needed)
                - npm install
        build:
            commands:
                - npm run build
    artifacts:
        baseDirectory: frontend/dist
        files:
            - '**/*'
    cache:
        paths:
            - frontend/node_modules/**/* 

## git clone the repository to Linux 
- npm install in both frontend and backend folders
- CD into frontend, run "npm run build" in frontend. 
- CD out.
- pm2 start server.js --name (give an application name)
- pm2 logs 0 (to check status. Node application should be running, with our own listening to port message)

## Configure Nginx Server
- sudo systemctl start nginx (Start nginx server)
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

- sudo nginx -t (Check any errors)
- sudo systemctl restart nginx (restar nginx server)

