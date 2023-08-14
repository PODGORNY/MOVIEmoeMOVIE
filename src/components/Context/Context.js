import React from 'react';
// context - способ передавать состояния к дальнему элементу, не проходя по всей цепочке вниз
// тем кому нужно значение оборачиваются в поле Provider - хранилище глобальных данных
// там где нужно прочитать это значение - создаётся Consumer
const Context = React.createContext();

export default Context;
