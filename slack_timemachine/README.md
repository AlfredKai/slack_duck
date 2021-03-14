# Slack Timemachine

Simple frontend for slack messages.

## Built With

- [Create React App](https://github.com/facebook/create-react-app)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Usage

start dev server

```bat
yarn start
```

build

```bat
yarn build
```

## Config

```js
const welcomeMessages = ['aaa', 'bbb', 'ccc'];

export const countingMessage = 'visitors';

export function chooseWelcomeMessages() {
  let index = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[index];
}

```
