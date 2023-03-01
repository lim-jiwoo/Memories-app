<div align="center">
<h1>Memories</h1>

This simple social media app, called "Memories", allows you to post memorable events that you want to share.<br>
Post your own events or check out other people's events!

<a href="https://memories-memories-app.netlify.app/"><strong>Visit Memories!</strong></a>

<br>

<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<br>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/mongoose-7a140c?style=for-the-badge&logo=mongoose&logoColor=white">
</div>

<br>

_🚩 This project is based on the tutorial by [JavaScript Mastery](https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu)_

</div>

<br>

## Table of Contents

- [Installing](#toc1)
- [Features](#toc2)
- [Folder Structure](#toc3)
- [Tech Stack](#toc4)
- [Discussions and Plans for Improvement](#toc5)

<br>

## Installing<a name="toc1"></a>

To run locally, clone the repository and run `npm i && npm start` for both client and server side.

```shell
$ npm install
$ npm start
```

You also need to create an `.env` file in both directories and set following environment variables. See `.env.example` in both directories.

```shell
# client/.env
REACT_APP_SERVER_URL={server IP address}
REACT_APP_GOOGLE_CLIENT={google client id for social login}

# server/.env
CONNECTION_URL={mongodb database url}
PORT={port number}
SECRET_KEY={secret string key for JWT}
```

<br>

## Features<a name="toc2"></a>

- Display all posts.
- Click the post to see the details on a new page.
  - The page displays the title, tags, description, creator, created time, and image of the post.
  - It also shows some (if any) of the recommended posts you may also like.
- Search posts with keywords and tags.
- Sign up & Sign in
  - We provide our own sign up system.
  - You may also sign up using your Google account.
- Create/Edit/Delete your post.
  - Give it a title, description, tags, and image file and click [submit] button.
  - Click on the [...] button on the top right of your post to edit it.
  - Delete the post by clicking the [delete] button on the bottom right of your post.
- Like/Unlike a post.
- This app is responsive. View in mobile, tablet, and desktop with cool responsive UI.

<br>

## Folder Structure<a name="toc3"></a>

```
.
├── client
│   ├── public
│   ├── src
│   │   ├── actions      // Redux action functions
│   │   ├── api          // server api endpoints
│   │   ├── components   // Each component folder contains relevant (sub)components and styles.js
│   │   │   ├── Auth
│   │   │   ├── Form
│   │   │   ├── Home
│   │   │   ├── Navbar
│   │   │   ├── PostDetails
│   │   │   └── Posts
│   │   │       └── Post
│   │   ├── constants    // provide string values as variables
│   │   ├── images       // image files
│   │   └── reducers     // Redux reducers
│   ├── App.js
│   └── index.js
│
└── server
    ├── controllers     // controller functions containing backend logic
    ├── middleware      // middleware (ex. for access token)
    ├── models          // mongoose schemas
    ├── routes          // express router
    └── index.js
```

<br>

## Tech Stack <a name="toc4"></a>

> <img src="https://user-images.githubusercontent.com/65887537/216818492-377e4711-b04b-44d4-b2d4-824e8e8126a6.png" width="17px"/> This section discusses which frameworks/libraries were used and why

### :: Frontend

<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
</div>

- `JavaScript` : This project was done in 2021 and I hadn't learnt TypeScript 😅
- `React` : The frontend framework I was most experienced with
- `Material-UI` : Wanted to spend more time on the logic and less on the design
- `Axios` : Popular library I wanted to try out
- `Redux` : Popular library I wanted to try out

### :: Backend

<div>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/mongoose-7a140c?style=for-the-badge&logo=mongoose&logoColor=white">
</div>

- `Nodejs` : To experience full-stack development using JavaScript
- `Express` : For neater routing of HTTP requests
- `MongoDB` : Nice starter when managing SQL database seemed a bit too much for a simple project
- `Mongoose` : To deal with MongoDB more easily

<br>

## Discussions and Plans for Improvement<a name="toc5"></a>

> <img src="https://user-images.githubusercontent.com/65887537/216818492-377e4711-b04b-44d4-b2d4-824e8e8126a6.png" width="17px"/> This section discusses what future plans I have for improvements and new features

- [ ] Google has changed its auth process. Update!
- [ ] The app is quite slow. Cache posts by page number or search results.
- [ ] Searching with no keyword currently returns 'no post'. Update so that it returns all posts instead.
- [ ] (Horizontal) Image is too large on the details page.
- [ ] Details page flickers and shows stale data for a bit.
- [ ] Use TypeScript
