# Contribute to Messenger Wrapped

Memeo is an open-source project. See the [LICENSE](./LICENSE.md) licensing information.

I really appreciate your interest in the project.

## Feature Requests

Submit feature requests by adding them under issues.

## Before Submitting a Pull Request

Pull requests will be reviewed by [@abmenzel](https://github.com/abmenzel) who will either merge it, request changes or close it.

## Development Workflow

### 1. Fork the [repository](https://github.com/abmenzel/memeo) using your own GitHub account.

### 2. Clone your repository

### 3. Install the dependencies

Go to the root of the repository and run

```bash
npm install
```

### 4. Setup Google Auth credentials

-   Copy the config.example.toml file in the supabase folder and name it config.toml
-   Setup a test app in google cloud
-   Replace the placeholder credentials in config.toml with the credentials from your test app

### 5. Start developing

Run the following command to start the development server:

```bash
npm run dev
```

### 6. Test that it builds

```bash
npm run build
```

### 7. Open a pull request

Push your changes and submit a pull request.
