import profile from "./profile";
import { actions } from "../actions/profile";
import { ProfileType } from "../../types/types";

// 1. test data. инициализируем state
let state = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  profile: null as ProfileType | null,
  status: "",
};

it("length of posts should be incremented", () => {
  // 2. action. иvпортируем action для теста
  let action = actions.addPostActionCreator("test-text");
  // прокидываем action чтобы узнать результат нового state
  let newState = profile(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(5);
});

// тест для будующего ф-ционала. TDD
it("after deliting length of messages should be decrement", () => {
  // 2. action. иvпортируем action для теста
  let action = actions.deletePost(1);
  // прокидываем action чтобы узнать результат нового state
  let newState = profile(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});
