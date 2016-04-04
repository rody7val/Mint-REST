define({ "api": [
  {
    "type": "post",
    "url": "/signup",
    "title": "Crear nuevo Usuario",
    "name": "NevoUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Ejemplo de datos con exito",
          "content": "{\n  \"id\": \"5702e0b9f36177c11916f3f1\",\n  \"message\": \"User has been created\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzAyZTBiOWYzNjE3N2MxMTkxNmYzZjEiLCJuYW1lIjoiUm9kb2xmbyBWYWxndWFybmVyYSIsInVzZXJuYW1lIjoicm9kN3ZhbCIsImVtYWlsIjoicm9kN3ZhbEBnbWFpbC5jb20iLCJpYXQiOjE0NTk4MDYzOTMsImV4cCI6MTQ1OTg5Mjc5M30.EYXPfsLkkPfENJf8fjCYfyZFF_EQkzjnqVYQo2xOh1Y\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje de exito</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Nuevo token de session</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de Usuario</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre de la persona.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre de Usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Direccion de email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contrseña de Usuario.</p>"
          }
        ]
      }
    },
    "filename": "./api.js",
    "groupTitle": "Usuario"
  }
] });
