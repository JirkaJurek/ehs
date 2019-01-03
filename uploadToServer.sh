scp -r ./api/modules ./api/web ./api/worker ./api/index.js ./api/package.json ./api/yarn.lock ./api/.env.example miki.rosi@90.183.137.60:/home/miki.rosi/nodejsApi
scp -r ./frontend/dist/* miki.rosi@90.183.137.60:/home/miki.rosi/nodejsApi/web/public
#scp -r ./api/modules ./api/web ./api/worker ./api/index.js ./api/package.json ./api/yarn.lock ./api/db.sql ./api/.env.example miki.rosi@192.168.1.240:/home/miki.rosi/nodejsApi
#scp -r ./frontend/dist/* miki.rosi@192.168.1.240:/home/miki.rosi/nodejsApi/web/public
#bacha na ty soubory v public


#časté příkazy na servru
#nahrání nové db -> mysql -u root -p intranet < db.sql
#najítí běžícího procesu ->  lsof -i :3030
#připojení mysql -> mysql -u root
#mysql příklady -> show databases; / DROP DATABASE intranet; / create database intranet;
#dump databáze -> mysqldump --opt --user=root  intranet > dbzaloha21/12/18.sql
# htaccess

ALTER TABLE `task`
ADD `number` varchar(100) NOT NULL AFTER `id`,
DROP `number`;