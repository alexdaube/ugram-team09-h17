# serveur

Le frontend est situé sur https://aide.moe ; il se situe derrière cloudfront

# backbone-starter

Avant de commencer, jetez un coup d'oeil aux ressources suivantes:
* [Backbone - Documentation](http://backbonejs.org/)
* [Underscore - Documentation](http://underscorejs.org/)
* [jQuery - Documentation](https://api.jquery.com/)
* [Backbone Fundamentals](https://addyosmani.com/backbone-fundamentals/)

# Tutoriels recommandés
* [Backbone Tutorial - Beginner](https://www.youtube.com/watch?v=FZSjvWtUxYk) (vu en GLO-3102)

# Compiler (pour runner avec WebStorm)
```sh
npm install
gulp
```
# Exécuter
Ouvrir `index.html` avec le serveur intégré de webstorm.
Le message `Hello GLO-3112 WEB!` devrais s'afficher dans votre navigateur, vous êtes prêt à développer!

# Compiler (pour runner en localhost)
```sh
npm install
gulp serve
```
Votre navigateur par défaut ouvrira `index.html` en localhost

# Inclure un template avec webpack
Voir [`HelloWorldView`](https://github.com/GLO3112/starter-packs/blob/master/backbone-starter/src/views/HelloWorldView.ts)

```typescript
this.template = require('./HelloWorldTemplate.ejs') as Function;
```

# Déploiement

Lors du déploiement avec AWS CodeDeploy, l'agent interprète le contenu du fichier appspec.yml :
* Il copie la partie frontend sur le serveur AWS EC2
* Il lance le script deployment_scripts/start_server qui transpile, configure et copie le frontend sur /www
* le serveur utilise s3fs-fuse et un bucket S3 est monté sur /www

Un trigger sur github lance automatiquement les déploiement sur AWS CodeDeploy lorsque la branche master est modifiée

# Intégration

Travis CI évalue le fichier .travis.yml :
* il installe les dépendances nodejs
* il lance tslint avec les paramètres "frontend/tslint.json" sur le frontend
* le tout est intégré avec github