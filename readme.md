# Integration Project
## Desiderius Hackathon project description

This project involves a large-scale integration of various systems for a hackathon organized by Desideriushogeschool. Participants can register for sessions, pay for events and consumptions, and companies can receive invoices. The project is carried out by teams with different roles, including Project Managers, Team leads/Integration Designers, and Developers/Testers. The use of existing software and tools from the field is essential, with a focus on developing a functional prototype that meets the client's needs. Regular demos and check-ins are conducted to monitor progress.

## How to run
1. Make sure docker is running.
2. Get .env file an place in project root (`scp .\.env student@10.2.160.71:/home/student/desiderius-hackathon`)
3. In project root run `docker-compose up -d` in terminal to start up containers.
4. Browse to `http://localhost:8080/` to visit the wordpress frontend.

### ! springampq container might fail, just run `docker-compose up --build -d springamqp` to rebuild image
This is due to the database not being ready, this is up untill to this day still an issue with docker and I lost 8 hours troubleshooting this.  

`docker container ls --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`  
`docker logs -f desiderius-hackathon_kibana_1`

## Initial Wordpress migration setup
This must be done once to set up the wordpress website

1. run `docker-compose up -d`
2. Browse to `http://localhost:8080/` and go trough initial setup (settings don't matter, will be overriden later)
3. Once logged into the admin pannel go to `Plugins > Add New Plugin`
4. Install and activate `All-in-One WP Migration` plugin
5. In terminal run: `docker exec wordpress bash -c "echo -e 'php_value upload_max_filesize 256M\nphp_value post_max_size 256M\nphp_value memory_limit 256M\nphp_value max_execution_time 300\nphp_value max_input_time 300' >> /var/www/html/.htaccess"`
6. Go to `All-in-One WP Migration > Import` and import file `wordpress_import_migration.wpress`
7. Enter password
8. Accept, finish installation and run `docker-compose down && docker-compose up -d`
9. Log in as Admin. Go to `Settings > Permalinks` and press `Save Changes` to fix som weird bug


## (old) Initial Spring rabbitmq-broker setup
application.properties is not needed anymore. You may empty the file. Configuration is don in SPRING_APPLICATION_JSON
1. create a new file `application.properties` for example:  

`\desiderius-hackathon\rabbitmq-broker\src\main\resources\application.properties`  
```
spring.rabbitmq.host= 127.0.0.1
spring.rabbitmq.port= 5672
spring.rabbitmq.username= guest
spring.rabbitmq.password= guest
server.port=8083
```

## (old) Windows slow wordpress workaround
https://stackoverflow.com/questions/54291859/docker-wordpress-super-slow  
The problem making wordpress slow is the way Docker wordpress handles it's filemounts.
Performance is much higher when files are bind-mounted from the Linux filesystem, rather than remoted from the Windows host. This is why we will need to run `docker-compose up -d` from inside a linux filesystem (wsl).
```
  wordpress:
    ...
    volumes:
      - ./wordpress:/var/www/html:delegated    <----- OLD
      - ~/wordpress:/var/www/html:delegated    <----- NEW
```
1. First we will need to install ubuntu on our wsl because the subsystems installed by Docker Desktop may only be used by the docker desktop engine.
    - Open CMD and run `wsl --install`
    - Set username and password
    - In CMD run `wsl --set-default Ubuntu`

2. Enable Docker Desktop for the Ubuntu wsl
    - In Docker Desktop go to `Settings > Resources > WSL Integration`
    - `Enable` integration with my default WSL distro
    - Apply and restart Docker desktop

3. Next we will make sure the compose file is run on the Ubuntu wsl
    - Open CMD and run
        - `wsl`
        - `cd ~`

4. We will need to copy our wordpress contents over to the Ubuntu wsl, the windows filesystem is mounted in `/mnt`. Following command is my personal example, this will differ from yours, so change accordingly.
    - `cp -r /mnt/[windows-path-to-project]/wordpress ./`
        - `cp -r /mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon/wordpress ./`
    - `sudo chmod 777 ~/wordpress`

5. Got to the mounted projectdirectory
    - `cd /mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon`
6. `docker-compose up -d`

You can now browse to the localhost wordpress website  

After this configuration, you can synch the folders with synch_wordpress powershell script. [You will need to change parameters!]

Easy command to run container from vscode terminal  
- `wsl bash -c "cd /mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon && sudo docker-compose up -d"`  
- `wsl bash -c "cd /mnt/c/Users/adam/Documents/integration_project/desiderius-hackathon && docker-compose down"`