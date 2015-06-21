# Newsletter builder

## Table des matières
1. Features
2. Installation
3. Utilisation
4. Démo

## 1. Features
* Construit sur le framework Ink, mis à jour avec Bower lors de l'installation
* Compatibilité avec tous les clients mails les plus courants, y compris outlook 125%+ dpi
* Automatiquement responsive
* Support Retina
* Automatisation des tâches, déclenchées à chaque modification d'un fichier source :
  * Nettoyage des dossiers de production avant chaque build
  * Application inline du CSS (depuis feuilles de style séparées)
  * Compression des images
  * Application des media queries dans la balise <head> du html (depuis feuille de style séparée)
  * Minification du fichier html
  * Création de deux archives zip dans un dossier dédié : html+images ou uniquement images
  * Message de notification

## 2. Installation
Récupérer l'ensemble des fichiers sources, à extraire à la racine du dossier de développement : https://github.com/toplefty/newsletter-builder/archive/master.zip

Pour installer le projet, il est ensuite nécessaire de récupérer toutes les dépendances. Ces étapes doivent être suivies l'une après l'autre :

1. `$ npm install` Récupère gulp ainsi que tous les plugins nécessaires
2. `$ bower install` Récupère le framework Ink
3. `$ gulp install` Copie le .css du framework Ink dans le dossier source (./src)
4. `$ gulp and-watch` Effecte un premier build (création des dossiers build et archive) puis lance un watch

Il est alors possible de commencer immédiatement à travailler dans les fichiers **boilerplate.html**, **styles.css** et **responsive.css** sans aucune configuration supplémentaire.

## 3. Utilisation

### Utilisation générale
Le travail se fait principalement dans boilerplate.html et styles.css

Le fichier html de travail contient déjà un template de base utilisable immédiatement, en suivant la syntaxe du framework Ink. S'il est possible d'ajouter des éléments à la balise head, il est préférable de ne pas supprimer les éléments par défaut, dans un soucis de compatibilité avec certains navigateurs.

Tous les styles css doivent être faits de préférence dans la feuille de style styles.css. Ils seront ensuite automatiquement injectés en inline à chaque sauvegarde (lorsque le watch est activé).
Les styles responsive doivent être inclus dans responsive.css. A chaque sauvegarde, ils seront injectés dans la balise head du html de production.

Si un style css doit impérativer se trouver dans la balise head du html final, il faut l'inclure dans le fichier responsive.css

Les images non compressées doivent être placées dans ./src/images, le reste est automatique. Pour appeller les images dans le html, ne pas inclure de path spécifique : `<img alt="" src="image.png" />`

Enfin, il est préférable de ne pas modifier les fichiers source, tels que ink.css. En cas de conflit de règles, ajouter du poids à son propre css.

### Ink
Pour l'utilisation du framework Ink, se référer à la documentation officielle : http://zurb.com/ink/docs.php

### Gulp
Pour gulp, ci-dessous la liste des tâches individuelles :
* `$ gulp archive` Assemble le fichier html final + les images compressées dans un .zip
* `$ gulp archive-img` Assemble les images compressées dans un .zip
* `$ gulp html` Traite l'ensemble des tâches liées au fichier html final (css, media queries, minification ...)
* `$ gulp images` Compresse les images
* `$ gulp clean` Nettoie complètement les dossiers build et archive

Liste des tâches générales :
* `$ gulp install` Installe le framework Ink
* `$ gulp and-watch` Lance un build ainsi qu'un watch, à utiliser par exemple en phase de dev
* `$ gulp watch` Ne lance qu'un watch, utile si le build est déjà à jour
* `$ gulp` Ne lance qu'un build, utile pour une phase de production

A noter que toute tâche de build, occasionnée par un `$watch` ou un `$gulp` lance l'intégralité des tâches individuelles, dont la suppression totale et irreversible de la version précédente du build.

## 4. Démo
Pour voir le builder en action : http://toplefty.github.io/newsletter-demo/
Cette page a été testée avec succès sur tous les clients web et desktop les plus courants. En ce qui concerne les mobiles, le responsive est 100% effectif sur les appareils Apple et Blackberry. En revanche, ce n'est pas le cas sur l'application Gmail.

| Environnement             |              Résultat              |
|---------------------------|:----------------------------------:|
| Apple Mail 7              |                  ✔                 |
| Apple Mail 8              |                  ✔                 |
| Live Mail                 |                  ✔                 |
| Lotus Notes 6.5           |                  ✘                 |
| Lotus Notes 7             |                  ✘                 |
| Lotus Notes 8             | Léger décalage des images          |
| Lotus Notes 8.5           |                  ✔                 |
| Outlook 2003              |                  ✔                 |
| Outlook 2007              | Padding 15px haut de page          |
| Outlook 2010              | Padding 15px haut de page          |
| Outlook 2011              |                  ✔                 |
| Outlook 2013              | Padding 15px haut de page          |
| Outlook 2013 HiDPI        | Les images ne sont pas agrandies   |
|                           |                                    |
| Android 4.4.4             | Compression horizontale            |
| Android Gmail             | Compression horizontale            |
| Gmail App iOs 7           | ✔ (mais pas de support responsive) |
| iPad 2                    |                  ✔                 |
| iPad mini                 |                  ✔                 |
| iPhone 5                  |                  ✔                 |
| iPhone 5s                 |                  ✔                 |
| iPhone 6                  |                  ✔                 |
| iPhone 6+                 |                  ✔                 |
|                           |                                    |
| AOL Chrome (mac)          |                  ✔                 |
| AOL Chrome (win)          |                  ✔                 |
| AOL Firefox (mac)         |                  ✔                 |
| AOL Firefox (win)         |                  ✔                 |
| AOL IE9 (win)             |                  ✔                 |
| AOL IE10 (win)            |                  ✔                 |
| AOL IE11 (win)            |                  ✔                 |
| AOL Safari (mac)          |                  ✔                 |
| BOL Chrome (win)          |                  ✔                 |
| Comcast Chrome (win)      |                  ✔                 |
| Comcast Firefox (win)     |                  ✔                 |
| EarthLink Chrome (win)    |                  ✘                 |
| Freenet.de Chrome (win)   |                  ✔                 |
| GMX Chrome (win)          |                  ✔                 |
| Gmail Chrome (mac)        |                  ✔                 |
| Gmail Chrome (win)        |                  ✔                 |
| Gmail Firefox (mac)       |                  ✔                 |
| Gmail Firefox (win)       |                  ✔                 |
| Gmail IE9 (win)           |                  ✔                 |
| Gmail IE10 (win)          |                  ✔                 |
| Gmail IE 11 (win)         |                  ✔                 |
| Gmail Safari (mac)        |                  ✔                 |
| Libero Chrome (win)       |                  ✔                 |
| Mail.ru Chrome (win)      |                  ✔                 |
| Office 365 Chrome (win)   |                  ✔                 |
| Office 365 Firefox (win)  |                  ✔                 |
| Office 365 IE9 (win)      |                  ✔                 |
| Office 365 IE 10 (win)    |                  ✔                 |
| Office 365 IE 11 (win)    |                  ✔                 |
| Orange.fr Chrome (win)    |                  ✔                 |
| Outlook.com Chrome (mac)  |                  ✔                 |
| Outlook.com Chrome (win)  |                  ✔                 |
| Outlook.com Firefox (mac) |                  ✔                 |
| Outlook.com Firefox (win) |                  ✔                 |
| Outlook.com IE9 (win)     |                  ✔                 |
| Outlook.com IE10 (win)    |                  ✔                 |
| Outlook.com IE11 (win)    |                  ✔                 |
| Outlook.com Safari (mac)  |                  ✔                 |
| SFR.fr Chrome (win)       |                  ✔                 |
| T-Online.de Chrome (win)  |                  ✔                 |
| Terra Chrome (win)        |                  ✔                 |
| Web.de Chrome (win)       |                  ✔                 |
| Yahoo! Chrome (mac)       |                  ✔                 |
| Yahoo! Chrome (win)       |                  ✔                 |
| Yahoo! Firefox (mac)      |                  ✔                 |
| Yahoo! Firefox (win)      |                  ✔                 |
| Yahoo! IE 10 (win)        |                  ✔                 |
| Yahoo! IE 11 (win)        |                 ???                |