# Module Federation - React Router DOM nested routers

# Shell app

```js
name: "mf_react_learn",
filename: "remoteEntry.js",
remotes: {
  dashboard: "dashboard@http://localhost:8081/remoteEntry.js",
  auth: "auth@http://localhost:8082/remoteEntry.js",
},
exposes: {},
shared: {
  ...deps,
  react: {
    singleton: true,
    requiredVersion: deps.react,
  },
  "react-dom": {
    singleton: true,
    requiredVersion: deps["react-dom"],
  },
},
```

<br>

# Running the demo

1. Install deps: `npm install`.
2. Start apps: `npm run start`.

Visit http://localhost:8080 to navigate `shell` app.

<br>


# Credit

Create using https://github.com/jherr/create-mf-app.