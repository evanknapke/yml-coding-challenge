### Coding Challenge Guidelines

Thank you for taking the time to submit your coding challenge with the Your Money Line (YML) team. We recognize that coding challenges may be stressful. Our team will carefully review your submission and provide feedback wherever we are able.

This challenge has been designed to be representative of our codebase and our workflow. We have designed these tasks to be completed in under an hour.

_To make this fair for all applicants, please do not spend more than 75 minutes on your submission._

If you have issues, please reach out to us via email at josh.hurst@yourmoneyline.com. And before you start, carefully read the setup & prep notes.

We look forward to seeing your submission & discussing your approach!

### Setup

This project requires yarn and node version 18.

We recommend you use [nvm](https://github.com/nvm-sh/nvm) to install/manage your Node.js versions.

If you can run `npx create-next-app@latest` while selecting Typescript, then you should have all of the dependencies needed.

### Background

This project simulates the Your Money Line application, which is built with Nextjs, Material UI, and Typescript.

The project structure consists of:

- a simplified Login page
- a Home page (/), which includes a Mortgage payment calculation
- a Budget page, which has a form used to save budget details
- a Debt page that calculates a debt paydown date
- an Admin page
- a test folder with a few simple UI tests for the Home page

We have included a few unit and UI tests that pass if you run `yarn test` in a terminal.

⚠️ Important ⚠️

The Home page, Budget page, and Debt page have a few bugs and visual problems. The Budget page in particular has big problems and seems to hang when you navigate to it. This is intentional and part of the coding challenge.

For the purposes of this coding challenge, please assume that all financial calculations are correct. Other areas of the codebase may have bugs or user experience challenges.

### Overall Evaluation Criteria

We are looking for submissions that meet the technical requirement of the tasks, as well as a keen eye toward code quality. We have included a few UX bugs and code smells. As you spot them, address them so long as the main tasks are complete. If you don't have time to improve the code, leave a `//TODO` comment.

Should you find yourself with additional time, add tests to cover important logic. We are not looking for 100% coverage, but covering important cases with tests will help us assess your submission.

#### GenAI Tools

The YML team uses GenAI tools, like Claude and ChatGPT, for our day-to-day work. We are very open to you using GenAI tools to assist your work during this submission. Please be ready to speak to the tools you used. Only submit code that you understand and can explain.

### Completing your submission

Please organize, design, test, and document your code as if it were
going into production - then push your changes to the master branch.

Have fun coding! 🚀

### Useful Links

- [NVM installation guide](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- [Material UI documentation](https://mui.com/material-ui/getting-started/)
- [Next.js Docs](https://nextjs.org/docs)
- [Formik Docs](https://formik.org/docs)

### Debugging

Should you need to debug, `console.log` is helpful. However, if you want to step through the code, you may find the following `.vscode/settings.json` useful.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev"
    },
  ]
}

```

## Task 1: Home page role check isn't being applied

### Description

This app uses a higher-order function to allow User Roles to access specific pages, found in `./src/withRoles.ts`.
The Login page and login methods have been simplified for this coding challenge -- review the `./pages/login.tsx` file.

### Your Task

The Home page (`/`) is allowing unauthenticated users to navigate to the page. Your task is to identify the cause and correct it.

_This will likely take you 5-10 minutes._

## Task 2: Finish Debt page calculation

### Description

The Debt page is left un-finished due to shifting priorities. This page has a few text inputs but we want to use Formik for validation and form handling.

### Your Task

Your task is to review the current experience, and then use the existing calculations to create a working Formik form with the 3 text inputs.

What we're looking for:

- a completed Formik form
- defensive programming -- input validation & limit enforcement
- move important business logic into an API route as time permits

Note: the Budget page may be useful if you get stuck.

_This will likely take you about 30 minutes._

## Task 3: Budget page is hanging/loading forever

### Description

A teammate merged their the Budget page but left it in a rough state. It seems to have a **major** performance issue. Don't be surprised if you have to close the tab and reopen it.

### Your Task

Your task is to review the loading logic on that page, identify the issue, and communicate the issue to the teammate through a comment near the incorrect code. Usually this kind of feedback would be a Slack message, or code review feedback. For this task, we're simulating that with an inline comment.

What we're looking for:

- a comment near the code that is causing the issue
- a clear description of the issue in the comment
- a helpful message to the teammate with a couple resources for them to read over

_This will likely take you about 10 minutes._
