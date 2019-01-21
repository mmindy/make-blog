- 참고 도서 : 김민준, **<리액트를 다루는 기술>**, 길벗, 2018
- 해당 도서 20장 '블로그 프로젝트' 실습 코드 기록
- 현재 파일은 실습 중 추가 기록
- - -

### 1. 리덕스
- 상태 관리 로직을 컴포넌트 밖에서 처리하는 것
- `store` 객체에 내부 상태를 담아, 이곳에서 모든 상태 관리함
- 상태에 병화 일으킬 때 `액션(action, 객체 형태)`을 스토어에 전달, 액션을 전달하는 과정을 `디스패치(dispatch)`라고 함
- 스토어가 액션을 받으면 `리듀서(reducer)`가 전달받은 액션을 기반으로 상태 어떻게 변경시킬지 결정, 액션 처리 시 새 상태 스토어에 저장
- 스토어 안의 상태 변경 시, 스토어 구독하고 있는 컴포넌트에 전달  
  부모 컴포넌트로 props 전달 작업 생략, 리덕스에 연결하는 함수 사용하여 컴포넌트를 스토어에 구독시킴

> **리덕스 관련 용어**
> - **스토어** : 애플리케이션의 상태값들을 내장하고 있음
> - **액션** : 상태 변화를 일으킬 때 참조하는 객체
> - **디스패치** : 액션을 스토어에 전달하는 것
> - **리듀서** : 상태 변화시키는 로직 있는 함수
> - **구독** : 스토어 값이 필요한 컴포넌트는 스토어를 구독함

### action
- 스토어에서 상태변화를 일으킬 때 참조하는 객체
- `type` 값 필수, 나머지 값들은 유동적
  ```js
  {
    type : 'INSERT_TODO',
    text : 'study react'
  }

  // or

  {
    type : 'INSERT_TODO',
    todo : {
      idx : 0,
      text : 'study react',
      done : false
    }
  }
  ```
- 액션 생성할 때마다 직접 객체 생성한다면, 액션 형식을 모두 꿰고 있어야 하므로 불편  
  \>> 보통 **액션 생성함수(action creator)** 사용
  ```js
  // action creator

  const INCREMENT = 'INCREMENT';
  const DECREMENT = 'DECREMENT';

  const increment = diff => ({
    type : INCREMENT,
    diff : diff
  })

  const decrement = diff => ({
    type : DECREMENT,
    diff : diff
  })
  ```

### 변화를 일으키는 함수, 리듀서
> - 스토어가 액션을 받으면 `리듀서(reducer)`가 전달받은 액션을 기반으로 상태 어떻게 변경시킬지 결정, 액션 처리 시 새 상태 스토어에 저장
- 두개의 파라미터 : (1) 현재 상태 (2) 액션 객체
```js

const initialState = {
  number : 0,
  foo : 'bar',
  bax : 'qux'
};

function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT :
      return Object.assign({}, state, {
        number : state.number + action.diff
      });
    case DECREMENT :
      return Object.assign({}, state, {
        number : state.number - action.diff
      });
    default :
      return state;
  }
}

```

```js
function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT :
      return {
        ...state,
        number : state.number + action.diff
      }
    case DECREMENT :
      return {
        ...state,
        number : state.number - action.diff
      }
    default :
      return state;
  }
}
```

#### 리덕스 스토어 생성
- 액션과 리듀서 준비 후, 리덕스 스토어 생성
- `createStore(리듀서 함수[, 스토어 기본 값])` 함수 사용. 스토어 기본값 설정 따로 안 할 경우, 리듀서 초깃값을 스토어 기본값으로 설정

```js
const { createStore } = Redux;
// ===  import { createStore } from 'Redux';

const store = createStore(counter);
```

#### 구독
- `react-redux`의 `connect()`함수가 대신함
- 리덕스 내장함수인 `subscribe()`는 직접 사용할 일 별로 없음
- 리덕스 스토어 구독한다는 것은, **리덕스 스토어의 상태가 바뀔 때마다 특정 함수를 실행시킨다**는 의미

#### dispatch
- 스토어에 액션을 넣을 떄는 `store.dispatch`
