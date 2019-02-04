scp -r ./api/modules ./api/web ./api/worker ./api/index.js ./api/package.json ./api/yarn.lock ./api/db.sql ./api/.env.example miki.rosi@90.183.137.60:/home/miki.rosi/nodejsApi
scp -r ./frontend/dist/* miki.rosi@90.183.137.60:/home/miki.rosi/nodejsApi/web/public
#scp -r ./api/modules ./api/web ./api/worker ./api/index.js ./api/package.json ./api/yarn.lock ./api/db.sql ./api/.env.example miki.rosi@192.168.1.240:/home/miki.rosi/nodejsApi
#scp -r ./frontend/dist/* miki.rosi@192.168.1.240:/home/miki.rosi/nodejsApi/web/public
#bacha na ty soubory v public


#časté příkazy na servru
#nahrání nové db -> mysql -u root -p intranet < db.sql
#najítí běžícího procesu ->  lsof -i :3030
#připojení mysql -> mysql -u root
#mysql příklady -> show databases; / DROP DATABASE intranet; / create database intranet;
#dump databáze -> mysqldump --opt -u root  -p intranet > dbzaloha2019-01-08.sql
# htaccess


#CREATE TABLE `log` (
#  `sql` longtext NOT NULL,
#  `userId` int(11) NOT NULL,
#  `type` varchar(255) NULL,
#  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
#  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
#);

#ALTER TABLE `log`
#ADD `values` longtext COLLATE 'utf8_general_ci' NULL AFTER `sql`;

#UPDATE `user_permissions` SET `category` = 'Úkoly' WHERE `id` = '12';

#UPDATE `user_permissions` SET `name` = 'Mazání položek', `action` = 'DeleteButton' WHERE `id` = '21';

#ALTER TABLE `tool`
#CHANGE `revisionTypes` `revisionTypes` longtext COLLATE 'utf8_general_ci' NULL COMMENT 'bude se moct odstranit' AFTER `revisions`,
#CHANGE `itemsHistory` `itemsHistory` longtext COLLATE 'utf8_general_ci' NULL COMMENT 'bude se moct odstranit' AFTER `items`;