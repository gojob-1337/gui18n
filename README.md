# GUi18n.io

Translate everything on Gitlab!

## Requirement 

GUI18N requires a gitlab token in order to consume the gitlab API.

Connect to [Gitlab > Application](https://gitlab.com/profile/applications) and create a new application providing the API scopes. 

You'll need to provide the `client_id` and the `redirect_url` to GUI18N.

## Development mode

Create a `.env` file providing:

```
CLIENT_ID=
REDIRECT_URL=
```

[Parcel](https://parceljs.org/) serves the whole application in development mode

### Install the dependencies
```bash
yarn
```

### Serve the application with hot reload
```bash
yarn start
```

## Build

You can either use the application in a node environment using the development mode or use the docker build:

```bash
docker build -t gui18n .
```

And then run it using the following command providing your `client_id` and `redirect_url`:

```bash
docker run -d -e "REDIRECT_URL=YOUR_REDIRECT_URL" -e "CLIENT_ID=YOUR_CLIENT_ID" -p3001:80 gui18n
```

or 

```
docker run -d --env-file ".env" -p3001:80 gui18n
```
