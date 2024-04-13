# Integration Project
## Desiderius Hackathon project description

This project involves a large-scale integration of various systems for a hackathon organized by Desideriushogeschool. Participants can register for sessions, pay for events and consumptions, and companies can receive invoices. The project is carried out by teams with different roles, including Project Managers, Team leads/Integration Designers, and Developers/Testers. The use of existing software and tools from the field is essential, with a focus on developing a functional prototype that meets the client's needs. Regular demos and check-ins are conducted to monitor progress.

## How to run
1. Make sure docker is running.
2. In project root run `docker-compose up -d` in terminal to start up containers.
3. Browse to `http://localhost:8080/` to visit the wordpress frontend.



## Windows slow wordpress workaround
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