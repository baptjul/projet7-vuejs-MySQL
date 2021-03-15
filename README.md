# Groupomania: réseau social d’entreprise

## Installation de l'application Groupomania


### DataBase

**MySQL**

__installation__

- Dans une invite de commande, aller dans le répertoire du projet `cd projet7`

- Connectez vous à MySQL

- Exécutez `mysql -u "username" -p groupomania < Dump20210308.sql`


### Backend

**Node.js** / **Express.js**

__installation__

-   Dans une invite de commande, aller dans le repertoire `backend`

-   Exécutez `npm install`

-   renommer le fichier `env_.txt` en `.env` et de remplacer les valeurs des variables qu'il contient   

__lancement__

-   Exécutez `nodemon server` pour lancer le serveur



### Frontend

**Vue.js**

__installation__

-    Dans une invite de commande, aller dans le repertoire `groupomania`

-   Exécutez `npm install`

__lancement__

-   Exécutez `npm run serve` pour lancer le serveur de développement ou `npm run build` pour la production.
