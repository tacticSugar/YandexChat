import userApi from '../api/user-api'
import { authApi } from '../api/auth-api'
import { store } from '../utils/core/Store'
import { MyRouter, routs } from '../index'
import { IChangeData, IChangePassword } from '../api/user-api'

class UserController {
  public changeProfile(data: IChangeData) {
    userApi
      .changeProfile(data)
      .then(() =>
        authApi.userInfo().then((data) => {
          store.setState('user', data.response)
          MyRouter.go(routs.profilePage)
        })
      )
      .catch(() => {
        MyRouter.go(routs.errorPage)
      })
  }

  public changePassword(data: IChangePassword) {
    userApi
      .changePassword(data)
      .then(() => MyRouter.go(routs.profilePage))
      .catch(() => {
        MyRouter.go(routs.errorPage)
      })
  }

  public changeAvatar(data: FormData) {
    userApi
      .changeAva(data)
      .then((res) => {
        store.setState('user', res.response)
        MyRouter.go(routs.profilePage)
      })
      .catch(() => {
        MyRouter.go(routs.errorPage)
      })
  }

  public getByLogin(login: string) {
    return userApi.getByLogin(login)
  }
}

const userController = new UserController()
export { userController }
