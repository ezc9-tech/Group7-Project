# Group7-Project

## Welcome

This is the Group 7 project for Intro to Software Engineering. Currently, this repository is a work in progress. As the semester continues, this README will be updated with setup instructions, working files, and proper documentation.

## How to Contribute

Firstly, clone the repository. Grab the repo link (SSH or HTTPS), navigate to your terminal, and run: 
`git clone <link>`

Navigate into the project folder, then create and switch to your own branch so that you can make Pull Requests (PRs): 
`git checkout -b <branch name>`

Ensure your branch is up to date with the main branch: 
`git pull origin main`

Once you have made your changes, stage them: 
`git add .` 
*(Note: Use `git add <file name>` if you only want to stage specific files)*

Commit those changes with a descriptive message: 
`git commit -m "<commit message>"`

Push the changes up to your remote branch: 
`git push -u origin <branch name>`

Finally, navigate to GitHub and open a Pull Request against the `main` branch. Make sure to add proper documentation and details about your changes as requested.

## How to run Frontend

Firstly, change your main directory to frontend:
`cd frontend`

Then, install all dependencies:
`npm i`

Finally, run this and navigate to the localhost link it provides:
`npm run dev`

Ensure that if you push changes to the repository to run eslint beforehand:
`npm run lint`

## How to run Backend

Firstly, change your main directory to backend:
`cd backend`

Then, install all dependencies:
`npm i`

Finally, run this and navigate to the localhost link it provides:
`npm run dev`