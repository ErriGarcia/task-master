# Task Master App

![Design preview for the Kanban task management web app coding challenge](./preview.jpg)

## Welcome! 👋

[Frontend Mentor](https://www.frontendmentor.io) challenges help me improve my coding skills by building realistic projects.

## The challenge

Your challenge is to build out this task master app and get it looking as close to the design as possible.

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- **Bonus**: Build this project as a full-stack application

### Expected Behaviour

- Boards
  - Clicking different boards in the sidebar will change to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details can be changed.
  - Columns are added and removed for the Add/Edit Board modals.
  - Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
  - Clicking "Add New Column" opens the "Edit Board" modal where columns are added.
- Tasks
  - Adding a new task adds it to the bottom of the relevant column.
  - Updating a task's status will move the task to the relevant column. If you're taking on the drag and drop bonus, dragging a task to a different column will also update the status.

### Installation

To install and use this software package, please follow these steps:

- Install Node.js version 16.0.0 or higher on your machine. You can download the latest version from the official Node.js website (https://nodejs.org).

- Clone the repository or download the source code for this software package.

- Open a terminal or command prompt and navigate to the directory where you have the source code.

- Run the following command to install the required dependencies:

```
npm install
```

Once the installation is complete, you are ready to use the software package.

### Usage
To use this software package, follow these steps:

- Make sure you have completed the installation steps mentioned above.

- Open a terminal or command prompt and navigate to the directory where you have the source code.

- Execute the following command to start the application:

```
npm start
```

The application will now start and you can interact with it as per its functionality.

### Contributing

If you wish to contribute to this software package, please follow the guidelines below:

Fork the repository and clone it to your local machine.

Create a new branch for your changes:

```
git checkout -b feature/your-feature
```

Replace your-feature with a descriptive name for your feature or improvement.

Make the necessary changes and test them thoroughly.

Commit your changes with a meaningful commit message:

```
git commit -m "fix: Add your commit message here"
```

Push your changes to your forked repository:

```
git push origin feature/your-feature
```

Open a pull request in this repository, describing your changes in detail.

License
This software package is licensed under the MIT License. Please review the license file for more information about the usage and distribution terms.
