# docs-snippet-tester
a cli to test code snippets in docs

## Running Locally

To run the CLI locally for development and testing purposes, follow these steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Run the CLI:**
   ```bash
   ./dist/cli.js <dir> [options]
   ```
   - `<dir>`: The directory to scan for docs.
   - `[options]`: CLI options like `--lang` or `--reporter`.

   For example, to test JavaScript snippets in the `tests` directory, you would run:
   ```bash
   ./dist/cli.js tests --lang js
   ```
