# ugram-h17-team-09

## Note: 
Le site web présente un problème avec le *rendering* des différentes pages. Sans vouloir rentrer dans le technique, à toutes les fois qu'une vue et *renderé* et *derenderé*, les *bindings* sur les différents objets de la page activée lors du *rendering* restent actif et donc sont tous lancés lorsqu'une action est exécutée. Par exemple, si un utilisateur accède à la page pour ajouter une photo plusieurs fois et, que par la suite, il ajoute une photo, la photo sera ajoutée autant de fois que l'utilisateur a accédé à la page. L'équipe est consciente du problème et tente de le régler le plus rapidement possible, mais elle n'a pas été en mesure de le régler avant la deuxième remise.

Le frontend est situé sur https://aide.moe ; il se situe derrière cloudfront
Le backend est situé sur https://api.aide.moe ; il se situe derrière cloudflare

## Livrable 1

### L'usager doit pouvoir consulter son profil usager.

Le profil usager est accessible en appuyant sur l'icon d'usagé en haut à droite de la page

La photo de profil, le nom d'usager, le prénom, le nom ainsi que la date d'inscription sont présents sur la page du profil. Le numéro de téléphone et l'adresse courriel sont présents dans la page de modification de profil, accèssible en appuyant sur le bouton "Update Profile"

### L’usager doit pouvoir éditer son profil usager.

Les informations d'usagé sont éditable via la page de modification du profil accèssible à appuyant sur le bouton "Update Profil" du profil

### L'usager doit pouvoir consulter la liste des usagers.

La liste des usagés est accessible en appuyant sur la boussole présente dans le header de la page web

### L'usager doit pouvoir consulter le profil d'un usager ainsi que ses images.

Le profil d'un autre usagé est disponble en appuyant sur le nom de celui-ci dans la page de recherche d'un utilisateur ou sur le nom de celui-ci dans les mentions des images postées

### L'usager doit pouvoir téléverser une image avec les champs suivants.

L'usagé peut téléversé une image en appuyant sur le bouton "Add picture" présent dans la page du profil d'utilisateur. L'usager peut ensuite ajouter une description. Dans cette description, il peut inclure des Mots clés (hashtag) et des mentions d'un usagé (avec l'indicateur @ suivie du nom d'un usagé) directement dans la description. C'est mots clés et mentions seront présents sur la page d'accueil du site web, sous les images.

### L'usager doit pouvoir modifier les champs d'une de ses images.

L'usager peut modifier une de ses images en appuyant sur celle-ci, en appuyant ensuite sur les trois point ( ... ) sous l'image, en sélectionnant "Edit", en entrant le nouveau texte et en appuyant sur le bouton "Save".

### L'usager doit pouvoir supprimer une de ses images.

L'usager peut supprimer une de ses images en appuyant sur celle-ci, en appuyant ensuite sur les trois point ( ... ) sous l'image et en sélectionnant "Delete"

### L'usager doit pouvoir consulter ses images.

L'usager peut consulter ses images en accèdant à son profil en appuyant sur l'icon d'utilisateur en haut à droite de la page

### L'usager doit pouvoir consulter une image en particulier.

L'usager peut consulter une image en particulier en appuyant sur celle-ci sur la page de profil d'utilisateur

### L'usager doit pouvoir consulter une liste d'images ordonnées par date, tout usager confondu.

La liste d'image, ordonnées par date, est disponible sur la page d'accueil de la page web

## Livrable 2

### L'usager doit pouvoir s'authentifier dans l'application en utilisant un fournisseur OAuth connu. (Facebook, Google etc.)

L'usager peut s'authentifier via Facebook en cliquant sur le bouton "Login with Facebook" sur la page d'accueil.

### S'il ne possède pas de compte, l'usager doit pouvoir s'enregistrer dans l'application.

Lorsque l'usager clique sur le bouton "Login with Facebook", s'il ne possède pas de compte, on lui demande d'entrer le nom qu'il désire utiliser sur le site web. En cliquant sur "Signup with Facebook", un compte est créé pour cet utilisateur. 

### L'usager doit pouvoir se déconnecter de l'application.

L'usager peut se déconnecter en cliquant sur les trois points (...) situés à droite de son nom dans la page profile. Il doit ensuite cliquer sur "Log out"

### L'usager doit pouvoir supprimer son compte.

L'usager peut se déconnecter en cliquant sur les trois points (...) situés à droite de son nom dans la page profile. Il doit ensuite cliquer sur "Delete my account" puis en cliquant sur "Click here to delete your account".

### L'usager doit pouvoir rechercher un autre usager.

Sur la page des utilisateurs (accessibles par la boussole en haut à droite), un usager peut saisir le nom ou une partie du nom d'utilisateur de l'utilisateur qu'il recherche. Une liste apparaîtra et il pourra ensuite sélectionner celui qu'il désire.

### L'usager doit pouvoir rechercher pour des images contenant un mot précis dans leur description.

Dans l'entête du site, l'usager peut saisir du texte correspondant à la description d'une image. Une liste des publications correspondates sera affichée et l'usager pourra sélectionner celle qu'il désire.

### L'usager doit pouvoir rechercher pour des images contenant un mot clé (hashtag) précis.

Dans l'entête du site, l'usager peut saisir du texte correspondant à un mot clé définis par le caractère "#". Une liste des publications correspondates sera affichée et l'usager pourra sélectionner celle qu'il désire.

## Livrable 3

### L'usager doit pouvoir réagir aux images d'un autre usager.

Il est possible pour l'usager d'Eggplanté une image lorsque celle-ci lui plait en cliquant sur la courge en-dessous de chaque image. 

### L'usager doit pouvoir commenter les images d'un autre usager.

Il est possible pour l'usager d'ajouter un commentaire à une image en ajoutant du texte dans le champ prévue à cet effet et en appuyant sur la touche "Enter".

### L'usager doit pouvoir consulter les réactions et commentaires sur l'une de ses images.

Le nombre de Eggplant et les commentaire d'une photos se retrouve sous ladite photo.

### L'usager doit pouvoir recevoir des notifications lorsqu'un usager réagit ou commente sur l'une de ses images.

L'usager peut consulter ses notifications lorsqu'un usagé Eggplant ou commente une de ses photos en appuyant sur le coeur dans le menu en haut à droite.

### L’application doit gérer le resizing des images téléchargées et offrir les images en différents formats.

Toutes les photos sont reszsées pour qu'elles aient la même largeur en gardant leur ratio largeur/longueur d'origine. Les images présentées sur le feed et sur une page de consultation ont tous la même largeur et ont des longeurs différentes. Les images sont aussi resizées sur la muraille de la page du profil d'utilisateur pour qu'elles prennent toute la taille de la division où elles sont présentées.

### L'application doit produire des analytiques sur le comportement de ses usagers.

Les analytiques du comportement des usagés sont disponibles sur Google Analytique.

### L'usager doit pouvoir se faire recommander les comptes d'usager les plus populaires

L'usager peut voir la liste des compte utilisateurs les plus populaires en cliquant sur l'étoile dans le menu en haut à droite.

### L'usager doit pouvoir consulter les mots-clés les plus populaires

L'usager peut voir la liste des mots-clés les plus populaires en cliquant sur l'étoile dans le menu en haut à droite.

### L'usager doit pouvoir prendre une photo avec sa webcam

L'usager peut prendre une photo avec sa webcam dans la page d'upload d'une photo disponible à partir de la page de son profil d'utilisateur.

### Lien(s) vers vos dashboards Google Analytics

https://analytics.google.com/analytics/web/#dashboard/JuxuGIuIQ9ihGbnHuFib5g/a1984981w143663348p148297469/%3F_u.date00%3D20170101%26_u.date01%3D20170417/

## Documentation API
Base URL: *https://api.aide.moe*

### basic-api
#### GET / 

### global-pictures-api
#### GET /pictures 

Model Schema
```json
[
  {
    "createdDate": {
      "afterNow": true,
      "beforeNow": true,
      "equalNow": true
    },
    "description": "string",
    "id": 0,
    "mentions": [
      "string"
    ],
    "tags": [
      "string"
    ],
    "url": "string",
    "userId": "string"
  }
]
```

### user-pictures-api
#### GET /users/{userId}/pictures

Model Schema
```json
[
  {
    "createdDate": {
      "afterNow": true,
      "beforeNow": true,
      "equalNow": true
    },
    "description": "string",
    "id": 0,
    "mentions": [
      "string"
    ],
    "tags": [
      "string"
    ],
    "url": "string",
    "userId": "string"
  }
]
```

#### POST /users/{userId}/pictures

Model Schema
```json
{
  "description": "string",
  "mentions": [
    "string"
  ],
  "tags": [
    "string"
  ]
}
```
Response
```json
{
  "id": "string"
}
```

#### DELETE /users/{userId}/pictures/{pictureId}

#### GET /users/{userId}/pictures/{pictureId}

Model Schema
```json
{
  "createdDate": {
    "afterNow": true,
    "beforeNow": true,
    "equalNow": true
  },
  "description": "string",
  "id": 0,
  "mentions": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "url": "string",
  "userId": "string"
}
```

#### PUT /users/{userId}/pictures/{pictureId}

Model Schema
```json
{
  "description": "string",
  "mentions": [
    "string"
  ],
  "tags": [
    "string"
  ]
}
```
Response
```json
{
  "createdDate": {
    "afterNow": true,
    "beforeNow": true,
    "equalNow": true
  },
  "description": "string",
  "id": 0,
  "mentions": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "url": "string",
  "userId": "string"
}
```

### users-api
#### GET /users

Model Schema
```json
[
  {
    "email": "string",
    "firstName": "string",
    "id": "string",
    "lastName": "string",
    "phoneNumber": 0,
    "pictureUrl": "string",
    "registrationDate": {
      "afterNow": true,
      "beforeNow": true,
      "equalNow": true
    }
  }
]
```

#### GET /users/{userId}

Model Schema
```json
{
  "email": "string",
  "firstName": "string",
  "id": "string",
  "lastName": "string",
  "phoneNumber": 0,
  "pictureUrl": "string",
  "registrationDate": {
    "afterNow": true,
    "beforeNow": true,
    "equalNow": true
  }
}
```
#### PUT /users/{userId} 

Model Schema
```json
{
  "email": "string",
  "firstName": "string",
  "id": "string",
  "lastName": "string",
  "phoneNumber": 0,
  "pictureUrl": "string",
  "registrationDate": {
    "afterNow": true,
    "beforeNow": true,
    "equalNow": true
  }
}
```
Response
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": 0
}
```
