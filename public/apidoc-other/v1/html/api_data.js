define({ "api": [
  {
    "type": "get",
    "url": "/rest/isLoggedIn",
    "title": "Check if User is logged in",
    "description": "<p>Checks if User is logged into the system by validating the session ID.</p>",
    "version": "1.0.0",
    "name": "isLoggedIn",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>User object with &quot;token&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n       username: \"planner_yap\",\n       profile: {\n       name: \"planner\",\n       dateTimeFormat: \"YYYY-MM-DD hh:mm:ss A\",\n       userDropdownMenu: {\n       items: {Array of Objects} \n       },\n       optimizationConfig: {\n           engine: \"siwei\",\n           maxIterations: 500,\n           nThreads: 2,\n           measureService: \"osmap\",\n           constraintOptions: {Object}\n           bSearchDistanceUsingDB: true,\n           bUpdateDistanceToDB: true\n       },\n       mappingConfig: {Object},\n       role: \"planner\",\n       modified_date: \"2017-08-01T05:08:21.407Z\",\n       email: null,\n       fullname: \"Yap Sui Jing\",\n       token: {Token String}\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/isLoggedIn"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response: 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/rest/login",
    "title": "Login",
    "description": "<p>Allows User to log into the system if he/she is authenticated and authorised.</p>",
    "version": "1.0.0",
    "name": "login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"demo1\",\n    \"password\": \"123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>User Object with &quot;token&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n       username: \"planner_yap\",\n       profile: {\n       name: \"planner\",\n       dateTimeFormat: \"YYYY-MM-DD hh:mm:ss A\",\n       userDropdownMenu: {\n       items: {Array of Objects} \n       },\n       optimizationConfig: {\n           engine: \"siwei\",\n           maxIterations: 500,\n           nThreads: 2,\n           measureService: \"osmap\",\n           constraintOptions: {Object}\n           bSearchDistanceUsingDB: true,\n           bUpdateDistanceToDB: true\n       },\n       mappingConfig: {Object},\n       role: \"planner\",\n       modified_date: \"2017-08-01T05:08:21.407Z\",\n       email: null,\n       fullname: \"Yap Sui Jing\",\n       token: {Token String}\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response: 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/rest/logout",
    "title": "Logout",
    "description": "<p>Logs user out of the system. User is recognised by his/her session ID.</p>",
    "version": "1.0.0",
    "name": "logout",
    "group": "Authentication",
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/logout"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/rest/problem/:problemId/:fieldName",
    "title": "Create field",
    "description": "<p>Create a field of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "createProblemField",
    "group": "CRUD_Problem_Field",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field name in problem instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{\"ok\":1,\"n\":1}",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Field",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId/:fieldName"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/rest/problem/:problemId/:fieldName",
    "title": "Delete field",
    "description": "<p>Delete a field of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "deleteProblemField",
    "group": "CRUD_Problem_Field",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field names in problem instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{ n_deleted: [deleted problem Field array]}",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Field",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId/:fieldName"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/problem/:problemId/:fieldName",
    "title": "Get field",
    "description": "<p>Get a field of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "getProblemField",
    "group": "CRUD_Problem_Field",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field names in problem instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "CALL /rest/problem/p_planner_yap_2017_06_06/services\nRETURN problem id: p_planner_yap_2017_06_06 [services ARRAY]",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Field",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/problem/:problemId/:fieldName"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/rest/problem:problemId/:fieldName",
    "title": "Update  field",
    "description": "<p>Update a field of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "updateProblemFieldItem",
    "group": "CRUD_Problem_Field",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field name in problem instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{\"ok\":1,\"n\":1}",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Field",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem:problemId/:fieldName"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/rest/problem/:problemId/:fieldName",
    "title": "Delete record",
    "description": "<p>Delete a record of a field array of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "deleteProblemFieldRecord",
    "group": "CRUD_Problem_Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field names in problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of record</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{\"ok\":1,\"n\":1}",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Record",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId/:fieldName"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/rest/problem/:problemId/:fieldName/:itemId",
    "title": "Get record",
    "description": "<p>Get a specific record of a field array of a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "getProblemFieldRecord",
    "group": "CRUD_Problem_Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fieldName",
            "description": "<p>field names in problem instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>id of record</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "CALL /rest/problem/p_planner_2017_08_07/services/2017-08-07_0001\nRETURN \n{\n       id: \"2017-08-07_0001\",\n       name: \"Rolando Alvarez\",\n       type: \"delivery\",\n       size: [30],\n       address: {\n               id: \"238959\",\n               postal: \"238959\",\n               name: \"Rolando Alvarez\",\n               address: \"sample Address\",\n               lat: 1.293928897,\n               lon: 103.8416786\n       },\n       service_duration: 300,\n       time_window: {\n               start: \"2017-08-07T14:00+08:00\",\n               end: \"2017-08-07T16:00+08:00\"\n       },\n       allowed_vehicles: [\"\"],\n       status: 1,\n       priority: 1\n   }",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem_Record",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId/:fieldName/:itemId"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/rest/problem",
    "title": "Create a problem",
    "description": "<p>Create a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "createProblem",
    "group": "CRUD_Problem",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"name\": \"sample_problem_name\",\n\t\"fleet_size\": \"FINITE\",\n\t\"coord_mode\": \"REAL\",\n\t\"vehicles\": [],\n\t\"vehicle_types\": [],\n\t\"items\": [],\n\t\"services\": [],\n\t\"shipments\": [],\n\t\"solutions\": [],\n\t\"addresses\": [],\n\t\"username\": [\"admin\"]\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "    {\n\t\"_id\": \"5982d65f3d1a401450d0272b\",\n\t\"name\": \"sample_problem_name\",\n\t\"fleet_size\": \"FINITE\",\n\t\"coord_mode\": \"REAL\",\n\t\"username\": [\"admin\"],\n\t\"date_format\": \"MM/DD/YY HH:mm\",\n\t\"vehicles\": [],\n\t\"vehicle_types\": [{\n\t\t\"id\": \"A\",\n\t\t\"capacity\": [10000],\n\t\t\"fixed_costs\": 0,\n\t\t\"distance_dependent_costs\": 1,\n\t\t\"time_dependent_costs\": 0\n\t}],\n\t\"services\": [],\n\t\"shipments\": [],\n\t\"solutions\": [],\n\t\"addresses\": [],\n\t\"items\": [{\n\t\t\"id\": \"Item1\",\n\t\t\"weight\": 1\n\t}],\n\t\"created_date\": \"2017-08-03T07:53:03.450Z\",\n\t\"modified_date\": \"2017-08-03T07:53:03.450Z\"\n    }",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/rest/problem/:problemIds",
    "title": "Delete problem",
    "description": "<p>Delete one or multiple problem instances</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "deleteProblem",
    "group": "CRUD_Problem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemIds",
            "description": "<p>Primary key value of instance to delete (separated by comma)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{\"ok\":1,\"n\":1}",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemIds"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response: 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ],
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/rest/problem/:problemId",
    "title": "Get problem",
    "description": "<p>Get a problem (full JSON file)</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "getProblem",
    "group": "CRUD_Problem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "{\n       _id: \"p_planner_yap_2017_06_06\",\n       name: \"p_planner_yap_2017_06_06\",\n       fleet_size: \"FINITE\",\n       coord_mode: \"REAL\",\n       username: [\"planner_yap\"],\n       date_format: \"MM/DD/YY HH:mm\",\n       vehicles: [Array of vehicles]\n       vehicle_types: [Array of vehicle types]\n       services: [Array of services]\n       shipments: [Array of shipments]\n       solutions: [Array of solutions],\n       addresses: [Array of addresses]\n       items: [{\n               id: \"Item01\",\n               weight: 1,\n               description: \"Items in KG Measurement\"\n       }],\n       created_date: \"2017-06-06T10:13:35.491Z\",\n       modified_date: \"2017-06-06T10:13:37.210Z\",\n       delivery_details: [Array of delivery details]\n   }",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/rest/problem_abstract",
    "title": "Get all problems",
    "description": "<p>Get all problems (full JSON files) belong to user authenticated in current session.</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "getProblemAbstract",
    "group": "CRUD_Problem",
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "[{\n      _id: \"p_planner_yap_2017_06_06\",\n      name: \"p_planner_yap_2017_06_06\",\n      fleet_size: \"FINITE\",\n      coord_mode: \"REAL\",\n      username: [\"planner_yap\"],\n      date_format: \"MM/DD/YY HH:mm\",\n      vehicles: [Array of vehicles]\n      vehicle_types: [Array of vehicle types]\n      services: [Array of services]\n      shipments: [Array of shipments]\n      solutions: [Array of solutions],\n      addresses: [Array of addresses]\n      items: [{\n              id: \"Item01\",\n              weight: 1,\n              description: \"Items in KG Measurement\"\n      }],\n      created_date: \"2017-06-06T10:13:35.491Z\",\n      modified_date: \"2017-06-06T10:13:37.210Z\",\n      delivery_details: [Array of delivery details]\n  },\n  {\n      _id: \"p_planner_2017_08_02\",\n      name: \"p_planner_2017_08_02\",\n      fleet_size: \"FINITE\",\n      coord_mode: \"REAL\",\n      username: [\"planner\"],\n      date_format: \"MM/DD/YY HH:mm\",\n      vehicles: [Array of vehicles]\n      vehicle_types: [Array of vehicle types]\n      services: [Array of services]\n      shipments: [Array of shipments]\n      solutions: [Array of solutions],\n      addresses: [Array of addresses]\n      items: [{\n              id: \"Item01\",\n              weight: 1,\n              description: \"Items in KG Measurement\"\n      }],\n      created_date: \"2017-06-06T10:13:35.491Z\",\n      modified_date: \"2017-06-06T10:13:37.210Z\",\n      delivery_details: [Array of delivery details]\n  }]",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem_abstract"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/rest/problem_abstract",
    "title": "Get all abstract problems",
    "description": "<p>Get all abstract problems (containing only selected fields) belong to user authenticated in current session.</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "problem_abstract",
    "group": "CRUD_Problem",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "-._id",
            "description": "<p>Problem's unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.name",
            "description": "<p>Problem's name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "-.coord_mode",
            "description": "<p>Coordinate type. Could be either &quot;REAL&quot; (real lat/lng coordinates) or &quot;2D&quot; (any float numbers)</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "-.no_of_solutions",
            "description": "<p>Numbers of Solutions exists in problem</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "-.no_of_orders",
            "description": "<p>Numbers of Orders (service + shipment) exists in problem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200 OK",
          "content": "[{\n       _id: \"p_planner_yap_2017_06_06\",\n       name: \"p_planner_yap_2017_06_06\",\n       coord_mode: \"REAL\",\n       created_date: \"2017-06-06T10:13:35.491Z\",\n       modified_date: \"2017-06-06T10:13:37.210Z\",\n       no_of_solutions: 0,\n       no_of_vehicles: 8,\n       no_of_orders: 99\n   },\n   {\n       _id: \"p_planner_2017_08_02\",\n       name: \"p_planner_2017_08_02\",\n       coord_mode: \"REAL\",\n       created_date: \"2017-08-02T01:53:38.477Z\",\n       modified_date: \"2017-08-03T01:38:21.241Z\",\n       no_of_solutions: 2,\n       no_of_vehicles: 8,\n       no_of_orders: 500\n   }]",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem_abstract"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response: 401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ],
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/rest/problem/:problemId",
    "title": "Update problem",
    "description": "<p>Update a problem</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "updateProblem",
    "group": "CRUD_Problem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of instance</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response 200",
          "content": "Updated problem object\n{\n       _id: \"p_planner_yap_2017_06_06\",\n       name: \"p_planner_yap_2017_06_06\",\n       fleet_size: \"FINITE\",\n       coord_mode: \"REAL\",\n       username: [\"planner_yap\"],\n       date_format: \"MM/DD/YY HH:mm\",\n       vehicles: [Array of vehicles]\n       vehicle_types: [Array of vehicle types]\n       services: [Array of services]\n       shipments: [Array of shipments]\n       solutions: [Array of solutions],\n       addresses: [Array of addresses]\n       items: [{\n               id: \"Item01\",\n               weight: 1,\n               description: \"Items in KG Measurement\"\n       }],\n       created_date: \"2017-06-06T10:13:35.491Z\",\n       modified_date: \"2017-06-06T10:13:37.210Z\",\n       delivery_details: [Array of delivery details]\n   }",
          "type": "json"
        },
        {
          "title": "Success-Response: 204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "CRUD_Problem",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/problem/:problemId"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "-",
            "description": "<p>Error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response: 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n\"Error message\"",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/cvrp/rest/geocode_problem/:problemId",
    "title": "Geocode Problem",
    "description": "<p>Gecode all addresses in a problem (query lat/lng using a specific map service provider)</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "1.0.0",
    "name": "geocodeProblem",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          }
        ]
      }
    },
    "group": "Optimization",
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "Optimization",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/cvrp/rest/geocode_problem/:problemId"
      }
    ]
  },
  {
    "type": "post",
    "url": "/rest/optimize_problem/:problemId",
    "title": "Optimize Problem",
    "description": "<p>Optimise delivery route for selected orders and vehicles using vrp-engine.</p>",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "problemId",
            "description": "<p>_id of problem instance</p>"
          }
        ],
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "engine",
            "description": "<p>Engine used to optimize. Valid values: &quot;siwei&quot; or &quot;chinh&quot;</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "solutionId",
            "description": "<p>ID of solution</p>"
          },
          {
            "group": "Request Body",
            "type": "Integer",
            "optional": false,
            "field": "maxIterations",
            "description": "<p>Maximum number of iterations</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "constraints",
            "description": "<p>Constraints settings</p>"
          },
          {
            "group": "Request Body",
            "type": "Array",
            "optional": false,
            "field": "selectedOrderIds",
            "description": "<p>Selected Order Ids to run in optimization.</p>"
          },
          {
            "group": "Request Body",
            "type": "Array",
            "optional": false,
            "field": "selectedVehicleIds",
            "description": "<p>Selected Vehicle Ids to run in optimization.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "  {\n    \"engine\":\"chinh\",\n    \"solutionId\":\"hi_01\",\n    \"maxIterations\":300,\n    \"constraints\":\"capacity_timeWindow_restrictJobsToSpecificVehicles_priorityJob\",\n    \"selectedVehicleIds\":[\"ANDYVEH\",\"DOEVEH\"],\n    \"selectedOrderIds\":[\"2017-08-03_0003\",\"2017-08-03_0004\"]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "name": "optimizeProblem",
    "group": "Optimization",
    "filename": "cvrp/n_cvrp.js",
    "groupTitle": "Optimization",
    "sampleRequest": [
      {
        "url": "http://localhost/cvrp/rest/optimize_problem/:problemId"
      }
    ]
  }
] });
