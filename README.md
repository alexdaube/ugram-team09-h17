# ugram-h17-team-09

Le site web est disponible à l'adresse suivante:
http://db19aqpshtnup.cloudfront.net
ou
http://aide.moe

## Instructions concernant les fonctionnalités implémentés

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

## Documentation API
Base URL: *http://api.aide.moe*

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


