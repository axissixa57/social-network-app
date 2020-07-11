import { followThunkCreator, unfollowThunkCreator, actions } from "./users";
import { usersAPI } from "../../api/users-api";
import { APIResponseType, ResultCodesEnum } from "../../api/api";

jest.mock("../../api/users-api"); // mock-аем апи, без этой записи не будет доступно .mockReturnValue (...is not a function)

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>; // благодаря этой типизации - .mockReturnValue не подчёркивается

const dispatchMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear(); // чтобы .toBeCalledTimes(3) вызывалась для каждого теста (если не указать будет суммроваться)
  // userAPIMock.follow.mockClear(); под вопросом, надо ли вообще или лишнее
});

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
  const thunk = followThunkCreator(1);

  await thunk(dispatchMock);

  expect(dispatchMock).toBeCalledTimes(3); // проверяет сколько раз вызвались ф-ции (причём это могут быть не только disptach, но в данном случае dispatch) внутри followThunkCreator
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1)
  );
});

test("success unfollow thunk", async () => {
  const thunk = unfollowThunkCreator(1);

  await thunk(dispatchMock);

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1)
  );
});
