### Coin Dashboard
#### This repo is for a personal project for cataloging coins into a database for tracking.

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD. The pipeline is defined in `.github/workflows/main.yml` and includes the following jobs:

1.  **`backend_build`**:
    *   Checks out the code.
    *   Sets up Node.js.
    *   Installs backend dependencies (`npm install`).
    *   Builds the backend TypeScript code (`npm run build`, which runs `tsc`).
    *   Archives the `dist/` directory, `node_modules/`, and `package.json` files as `backend-artifact`.

2.  **`frontend_build`**:
    *   Checks out the code.
    *   Sets up Node.js.
    *   Installs frontend dependencies (`npm install` in the `frontend` directory).
    *   Builds the Next.js frontend (`npm run build` in the `frontend` directory).
    *   Lints the frontend code (`npm run lint` in the `frontend` directory).
    *   Archives the `frontend/.next/`, `frontend/public/`, `frontend/package.json`, `frontend/package-lock.json`, and `frontend/next.config.ts` as `frontend-artifact`.

3.  **`deploy`**:
    *   This job runs after successful completion of `backend_build` and `frontend_build`.
    *   Downloads `backend-artifact` and `frontend-artifact`.
    *   Currently, this job is a placeholder and will list the contents of the downloaded artifacts.
    *   **To implement deployment:** Modify the `deploy` job in `.github/workflows/main.yml` to include scripts for deploying the artifacts to your server (e.g., using SCP/SSH, Docker push, etc.).

The pipeline is triggered on pushes and pull requests to the `main` branch.
