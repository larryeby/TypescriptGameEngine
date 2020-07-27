# Typescript Game Engine

The Typescript Game Engine is a work-in-progress 2D game engine. It's built using Angular for easy project organization. The goal of this project is to create an intuitive and easy to use game making tool with export functionality so you can easily share your games. Eventually, it would be nice for it to support WebGL, but at the moment, I'm focusing on 2D rendering.

# What it current supports
- 2D sprite rendering and animation
- Audio
- Eventing and collisions (No poly collision supported yet. Only box and circle colliders).
- Input from keyboard and mouse.

For examples of each, visit the `src/app/services/game-staging.service.ts` file and comment/uncomment the examples. Inside the `object-extensions` folder, you will find example game objects used to test out functionality.

# To run
- Clone repository
- Run `npm i`
- Run `ng serve`