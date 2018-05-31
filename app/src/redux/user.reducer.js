import axios from "axios";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  type: ""
};

function getRedirectPath({ type, avatar }) {
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = type === "boss" ? "/boss" : "/genius";
  if (!avatar) {
    url += "info";
  }
  return url;
}

// action creater
const registerSuccess = data => ({ type: "REGISTER_SUCCESS", payload: data });
const loginSuccess = data => ({ type: "LOGIN_SUCCESS", payload: data });
const errorMsg = msg => ({ type: "ERROR_MSG", msg });
const authSuccess = obj => {
  const { pwd, ...data } = obj;
  return { type: "AUTH_SUCCESS", payload: data };
};
export const loadData = userinfo => ({ type: "LOAD_DATA", payload: userinfo });
export const login = ({ user, pwd }) => {
  if (!user || !pwd) {
    return errorMsg("用户密码必须输入");
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          dispatch(loginSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      }
    });
  };
};

export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) {
    return errorMsg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不同");
  }
  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
};

export const update = data => {
  return dispatch => {
    axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
};

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      console.log(action, "action");
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}
